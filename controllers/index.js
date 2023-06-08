// Imports
const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// Export
module.exports = router;
