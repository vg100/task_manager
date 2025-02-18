const { Router } = require('express');
const TaskController = require('../Controller/tasks.controller');
const GlobalMiddleWare = require('../MiddleWare/GlobalMiddleWare');


class TaskRouter {

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        this.router.get('/', GlobalMiddleWare.authenticate, TaskController.getAllTaskByUserId);
        this.router.get('/:id', GlobalMiddleWare.authenticate, TaskController.getTaskById);
    }

    postRoutes() {
        this.router.post('/', GlobalMiddleWare.authenticate, TaskController.createTaskByUserId);
    }
    putRoutes() {
        this.router.put('/:id', GlobalMiddleWare.authenticate, TaskController.updateTaskById);
    }
    deleteRoutes() {
        this.router.delete('/:id', GlobalMiddleWare.authenticate, TaskController.deleteTaskById);
    }
}

module.exports = new TaskRouter().router;