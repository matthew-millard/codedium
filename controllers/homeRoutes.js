// Imports
const home = require('express').Router();

home.get('/', async (req, res) => {
  try {
    return res.status(200).render('home');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Login Route
home.get('/login', async (req, res) => {
  try {
    return res.status(200).render('login');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Exports
module.exports = home;
