const express = require('express');

// Controllers
const { 
    getAllComments,
    createComment,
    getCommentById,
    updateComment,
    deleteComment
 } = require('../controllers/comments.controller');

 //Middleware
 const { commentExists } = require('../middlewares/comments.middleware'); 

// Define endpoints before activate server listening to requests
const commentsRouter = express.Router();

// GET: needs two parameters 1) the url 2) response as callback
commentsRouter.get('/', getAllComments);

commentsRouter.post('/', createComment);

commentsRouter.get('/:id', commentExists, getCommentById);

commentsRouter.patch('/:id', commentExists, updateComment);

commentsRouter.delete('/:id', commentExists, deleteComment);

// module is a nodeJS global object
module.exports = { commentsRouter };