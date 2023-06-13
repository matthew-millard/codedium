// Imports
const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

// Routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// Export
module.exports = router;
