// Imports
const user = require('express').Router();
const { User } = require('../../models');

// Sign up - Create a new user
user.post('/sign-up', async (req, res) => {
  // Collect username and password
  const { username, password } = req.body;

  // Validation Checks
  if (!username || username.trim() === '') {
    return res.status(400).json({ message: 'Username is required' });
  }

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({
        message: 'Password is required and must be at least 8 characters long',
      });
  }
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      return res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Server Error', error: err.message });
  }
});

// User Login
user.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const userData = await User.findOne({ where: { username: username } });

    // Checks if username exist
    if (!userData) {
      return res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again.' });
    }

    // Validate password
    const validPassword = await userData.checkPassword(password);

    // Checks if password is valid
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again.' });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      return res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Exports
module.exports = user;
