const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/user.model');
const { Post } = require('../models/post.model');
const { Comment } = require('../models/comment.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env' });

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({
        include: [
            { model: Post, include: [
                { model: Comment, include: User }
            ]}
        ]
    });

    //Process the request (return the users' list)
    res.status(200).json({
    // Send personalized messages as below
        status: 'success',
    // message: 'Everything is okay',
        users
    });    
});

const createUser = catchAsync(async (req, res, next) => {
    const { name, age, email, password } = req.body;

    //Hash password
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt); //salt 

    const newUser = await User.create({ 
        name, 
        age, 
        email, 
        password: hashPassword,
    });

    //Remove password from response
    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        newUser
    });   
});

const getUserById = catchAsync(async (req, res, next) => {
    const { user } = req;

    res.status(200).json({
        status: 'success',
        user
    });
});

const updateUser = catchAsync(async (req, res, next) => {
    const { user } = req;
    const { name } = req.body;

    await user.update({ name });

    res.status(204).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req;

    await user.update({ status: 'deleted'});

    res.status(204).json({ status: 'success' });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //Validate credentials (email)
    const user = await User.findOne({ where: { email, status: 'active' } });

    if(!user){
        return next(new AppError('Credentials invalid', 400));
    }

    //Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
        return next(new AppError('Credentials invalid', 400));
    }

    //Generate JWT (Jason Web Token)
    //require('crypto').randomBytes(64).toString('hex')
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, { 
        expiresIn: '5d',
     });

    //Send response
    res.status(200).json({
        status: 'success',
        token,
    });
});

module.exports = { 
    getAllUsers, 
    createUser, 
    getUserById, 
    updateUser, 
    deleteUser,
    login
};