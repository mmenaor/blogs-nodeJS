//In app we want everything related to express

// import express
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { postsRouter } = require('./routes/posts.routes');
const { commentsRouter } = require('./routes/comments.routes');

//Global error controller
const { globalErrorHandler } = require('./controllers/error.controller');

//Utils
const { AppError } = require('./utils/appError.util');

// Init express app
const app = express();

// Add to the app the json method
app.use(express.json());

// Limit the number of requests that can be accepted to our server
const limiter = rateLimit({
    max: 5,
    windowMs: 1 * 60 * 1000,
    message: 'Number of requests have been exceeded'
});

app.use(limiter);

//Add security headders
app.use(helmet());

//Compress responses
app.use(compression());

//Log incoming requests
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/comments', commentsRouter);

//Hanlde incoming unknown routes to the server
app.all('*', (req, res, next) => {
    next(new AppError(`${req.method} ${req.originalUrl} not found in this server`), 404);
});

//Global error controller
app.use(globalErrorHandler);

module.exports = { app };