const express = require('express');

// Controllers
const { getAllUsers, createUser, getUserById, updateUser, deleteUser, login } = require('../controllers/users.controller');

//Middlewares
const { createUserValidators } = require('../middlewares/validators.middlewares');
const { userExists } = require('../middlewares/users.middleware');
const { protectSession, protectUserAccount } = require('../middlewares/auth.middleware');

// Define endpoints before activate server listening to requests
const usersRouter = express.Router();

// POST: needs two parameters 1) the url 2) get the request as callback
usersRouter.post('/', createUserValidators, createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

// GET: needs two parameters 1) the url 2) response as callback
usersRouter.get('/', getAllUsers);

usersRouter
    .use('/:id',userExists)
    .route('/:id')
    .get(getUserById)
    .patch(protectUserAccount, updateUser)
    .delete(protectUserAccount, deleteUser);

// module is a nodeJS global object
module.exports = { usersRouter };