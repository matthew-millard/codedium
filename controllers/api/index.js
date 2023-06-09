// Imports
const api = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// Api Routes
api.use('/users', userRoutes);
api.use('/posts', postRoutes);

// Exports
module.exports = api;
