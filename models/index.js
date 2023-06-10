// Imports
const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

// Create associations

// User and BlogPost relationship
User.hasMany(BlogPost, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE', // This will delete associated blog posts when a user is deleted
});

BlogPost.belongsTo(User, {
  foreignKey: 'author_id',
});

// User and Comment relationship
User.hasMany(Comment, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'author_id',
});

// BlogPost and Comment relationship
BlogPost.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(BlogPost, {
  foreignKey: 'blog_id',
});

// Export the models
module.exports = { User, BlogPost, Comment };
