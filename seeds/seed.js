const sequelize = require('../config/connection');

// Import the models
const { User, BlogPost } = require('../models');

// Import the seed data
const userSeedData = require('./userSeedData');
const blogSeedData = require('./blogSeedData');

// Seed Database

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Seed User data first as the BlogPost data are dependent on the foreign key
    await User.bulkCreate(userSeedData, {
      individualHooks: true,
    });

    // Seed the BlogPost data
    await BlogPost.bulkCreate(blogSeedData);
  } catch (err) {
    console.error(err);
  }

  process.exit(0);
};

seedDatabase();
