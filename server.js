//In server we want everything related to servers

const { app } = require('./app');

//Models
const { User } = require('./models/user.model');
const { Post } = require('./models/post.model');
const { Comment } = require('./models/comment.model');

// import database created in database.util
const { db } = require('./utils/database.util');

db.authenticate()
    .then(() => console.log('Database authenticated'))
    .catch(err => console.log(err));

//Establish model's relations
// de uno a muchos
User.hasMany(Post, {foreignKey: 'userId'});
Post.belongsTo(User);

User.hasMany(Comment, {foreignKey: 'userId'});
Comment.belongsTo(User);

Post.hasMany(Comment, {foreignKey: 'postId'});
Comment.belongsTo(Post)


db.sync()
    .then(() => console.log('Database sync'))
    .catch(err => console.log(err));

// Habilitar la aplicación
app.listen(4000, () => {
    console.log('Express app running!!!');
});