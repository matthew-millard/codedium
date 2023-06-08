// Imports
const router = require('express').Router();
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);

// Export
module.exports = router;
