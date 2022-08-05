const router = require('express').Router();
const playlistRoutes = require('./playlistRoutes');
const userRoutes = require('./userRoutes');
const trailRoutes = require('./trailRoutes');

router.use('/playlist', playlistRoutes);
router.use('/user', userRoutes);
router.use('/trail', trailRoutes);

module.exports = router;

