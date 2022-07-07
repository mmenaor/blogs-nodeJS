const express = require('express');

// Controllers
const { getAllPosts, createPost } = require('../controllers/posts.controller');

//Middlewares
const { protectSession } = require('../middlewares/auth.middleware');

// Define endpoints before activate server listening to requests
const postsRouter = express.Router();

postsRouter.use(protectSession);

// GET: needs two parameters 1) the url 2) response as callback
postsRouter.get('/', getAllPosts);

// POST: needs two parameters 1) the url 2) get the request as callback
postsRouter.post('/', createPost);

// module is a nodeJS global object
module.exports = { postsRouter };