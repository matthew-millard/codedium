// Imports
const { Model, DataTypes, TEXT } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    blog_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blog_body: {
      type: TEXT,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'BlogPost',
    timestamps: true,
    freezeTableName: true,
    underscored: true,
  }
);

// Exports
module.exports = BlogPost;
