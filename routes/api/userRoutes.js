const router = require('express').Router()
const { User, Trail, Playlist } = require('../../models')

router.get('/', (req, res) => {
	User.findAll()
		.then((data) => {
			res.json(data)
		})
		.catch((err) => {
			res.status(500).json({ msg: 'ERROR', err })
		})
})
//-------------------This thing works------------------------------------
router.get('/register', (req, res) => {
	console.log('---------REGISTER PAGE GENERATED---------')
	res.render('register')
})
router.post('/register', async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		User.create({
			username: req.body.username,
			password: hashedPassword,
		}).catch((err) => {
			res.status(500).json({ msg: 'ERROR', err })
		})
		res.redirect('/login')
	} catch {
		//reload if error
		console.log('there was an error in creating account')
		res.redirect('/register')
	}
	res.render('register')
})
router.get('/login', (req, res) => {
	console.log('----------LOGIN PAGE GENERATED---------')
	res.render('login')
})
router.post('/login', async (req, res) => {
	console.log('------LOGIN BUTTON PRESSED------')
	try {
		const foundUser = await User.findOne({
			where: {
				username: req.body.username,
			},
		})
		res.render
		if (!foundUser) {
			return res.status(401).json('invalid login credentials')
		}
		if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
			return res.status(401).json('invalid login credentials')
		}
		req.session.loggedin = true
		//GO TO HOME PAGE
		res.status(200).render('homePage')
	} catch (err) {
		console.log(err)
	}
})
//----------------------------------------------------------------------

module.exports = router
