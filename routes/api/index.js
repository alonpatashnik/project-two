const router = require('express').Router();
const userRoutes = require('./userRoutes');
const trailRoutes = require('./trailRoutes');
// const playlistRoutes = require('./playlistRoutes')

// router.use('/playlist', playlistRoutes)
router.use('/user', userRoutes);
router.use('/trails', trailRoutes);

module.exports = router;

