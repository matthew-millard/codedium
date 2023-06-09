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
      req.session.logged_in = true;

      return res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Exports
module.exports = user;
