const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
const reactionRoutes = require('./reactionRoutes');


router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);


module.exports = router;
