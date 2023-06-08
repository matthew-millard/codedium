// Imports
const user = require('express').Router();
const { User } = require('../../models');

// Create a new user
user.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      return res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err);
    console.log('Request body:', req.body);
    return res
      .status(500)
      .json({ message: 'Server Error', error: err.message });
  }
});

// Exports
module.exports = user;
