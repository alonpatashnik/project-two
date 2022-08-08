const router = require('express').Router();
const userRoutes = require('./userRoutes');
<<<<<<< HEAD
const playlistRoutes = require('./playlistRoutes')
const trailRoutes = require('./trailRoutes')

router.use('/user', userRoutes);
router.use('/playlist', playlistRoutes);
router.use('/trail', trailRoutes);
=======
const trailRoutes = require('./trailRoutes');

router.use('/user', userRoutes);
router.use('/trails', trailRoutes);
>>>>>>> dev

module.exports = router;

