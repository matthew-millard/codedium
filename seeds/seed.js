// Import sequelize instance
const sequelize = require('../config/connection');

// Import the models
const { User, BlogPost, Comment } = require('../models');

// Import the seed data
const userSeedData = require('./userSeedData');
const blogSeedData = require('./blogSeedData');
const commentSeedData = require('./commentSeedData');

// Seed Database
const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Synchronize the models with the database and drop any existing tables and recreate them with this data.

    // Seed User data first as the BlogPost data are dependent on the foreign key
    await User.bulkCreate(userSeedData, {
      individualHooks: true,
    });

    // Seed the BlogPost data
    await BlogPost.bulkCreate(blogSeedData);

    // Seed the Comment data
    await Comment.bulkCreate(commentSeedData);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0); // Terminate and exit
  }
};

seedDatabase();
