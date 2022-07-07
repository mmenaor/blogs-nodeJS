//Models
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');
const { Comment } = require('../models/comment.model');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [ 
                { model: User }, 
                { model: Comment, include: [{ model: User }]}
            ]
        });

        //Process the request (return the users' list)
        res.status(200).json({
        // Send personalized messages as below
            status: 'success',
        // message: 'Everything is okay',
            posts
        });    
    } catch (err) {
        console.log(err);
    }
};

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { sessionUser } = req; 

        const newPost = await Post.create({ 
            title,
            content,
            userId: sessionUser.id
        });

        res.status(201).json({
            status: 'success',
            newPost
        });   
    } catch (err) {
        console.log(err);
    }
};

module.exports = { getAllPosts, createPost };