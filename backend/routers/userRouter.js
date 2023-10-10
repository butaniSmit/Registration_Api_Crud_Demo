const express = require('express');
const userController = require('./../controllers/userController');
const Router = express.Router();

Router.route('/').post(userController.uploadUserPhoto,userController.postUser).get(userController.getAllUser);
Router.route('/:id').get(userController.getUser).patch(userController.uploadUserPhoto,userController.editUser).delete(userController.deleteUser)
module.exports = Router;