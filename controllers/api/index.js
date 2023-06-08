// Imports
const api = require('express').Router();
const userRoutes = require('./userRoutes');

// Api Routes
api.use('/users', userRoutes);

// Exports
module.exports = api;
