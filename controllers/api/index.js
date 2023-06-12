// Imports
const api = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoute');

// Api Routes
api.use('/users', userRoutes);
api.use('/posts', postRoutes);
api.use('/comments', commentRoutes);

// Exports
module.exports = api;
