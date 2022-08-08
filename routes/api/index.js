const router = require('express').Router();
const userRoutes = require('./userRoutes');
const trailRoutes = require('./trailRoutes');

router.use('/user', userRoutes);
router.use('/trails', trailRoutes);

module.exports = router;

