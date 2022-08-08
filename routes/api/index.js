const router = require('express').Router();
const userRoutes = require('./userRoutes');
const playlistRoutes = require('./playlistRoutes')
const trailRoutes = require('./trailRoutes')

router.use('/user', userRoutes);
router.use('/playlist', playlistRoutes);
router.use('/trail', trailRoutes);

module.exports = router;

