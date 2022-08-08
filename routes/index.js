const router = require('express').Router();
const apiRoutes = require('./api');
const { User, Trail, Playlist } = require('../models')
const bcrypt = require('bcrypt')

router.use('/api', apiRoutes);

router.get('/login', (req, res) => {
	res.render('login')
})
router.get('/register', (req, res) => {
	res.render('register')
})
router.post('/register', async (req, res) => {
	try {
		console.log('arrived')
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
    	await User.create({
			username: req.body.username,
			password: hashedPassword
		})
		// .catch((err) => {
		// 	res.status(500).json({ msg: 'ERROR', err })
		// })
		res.redirect('/login')
		//store users in database
	} catch {
		//reload if error
		console.log('there was an error in creating account')
		res.redirect('/register')
	}
	res.render('register')
})

module.exports = router;