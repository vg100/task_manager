const Jwt = require('jsonwebtoken')

 class GlobalMiddleWare {
    static async authenticate(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Authorization token missing or invalid' });
            }
            const token = authHeader.split(' ')[1];
            const decoded = Jwt.verify(token, 'task');

            if (!decoded) {
                return res.status(401).json({ message: 'User Not Authorised' });
            }
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token', error: error.message });
        }
    }
}

module.exports= GlobalMiddleWare