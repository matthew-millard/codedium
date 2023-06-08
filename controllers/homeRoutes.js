// Imports
const home = require('express').Router();

home.get('/', async (req, res) => {
  try {
    return res.status(200).json({ message: 'Hi there!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Exports
module.exports = home;
