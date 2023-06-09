// Imports
const User = require('./User');
const BlogPost = require('./BlogPost');

// Create associations
User.hasMany(BlogPost, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE', // This will delete associated blog posts when a user is deleted
});

BlogPost.belongsTo(User, {
  foreignKey: 'author_id',
});

// Export the models
module.exports = { User, BlogPost };
