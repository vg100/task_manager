const User = require("../Modals/user.modal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
    static async signup(req, res, next) {
        try {
            const { password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ ...req.body, password: hashedPassword });
            res.status(201).json({
                success: true,
                message: 'Account created successfully.',
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            console.log(email,'hhh')
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success: false, message: "Invalid email or password." });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: "Invalid email or password." });
            }

            const token = jwt.sign({ userId: user._id }, "task", { expiresIn: "7d" });
            res.status(200).json({
                success: true,
                message: "Login successful.",
                token,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
