// Imports
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const BlogPost = require('./BlogPost');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_body: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    author_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: BlogPost,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    timestamps: true,
    freezeTableName: true,
    underscored: true,
  }
);

// Exports
module.exports = Comment;
