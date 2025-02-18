const { Router } = require('express');
const UserController = require('../Controller/user.controller');


class UserRouter {

    constructor() {
        this.router = Router();
        this.postRoutes();
    }

    postRoutes() {
        this.router.post('/signup', UserController.signup);
        this.router.post('/login', UserController.login);
    }
}

module.exports =  new UserRouter().router;