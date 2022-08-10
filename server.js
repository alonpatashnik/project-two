const express = require('express')
const routes = require('./routes')
const sequelize = require('./config/connection')
const { Trail, User, Playlist } = require('./models')
const exphbs = require('express-handlebars')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const bcrypt = require('bcrypt')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const sess = {
	secret: 'Super secret secret',
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
}

app.use(session(sess))

// Static directory
app.use(express.static('public'))

const hbs = exphbs.create({})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// THIS SHOULD NOW BE COVERED IN homeRoutes.js
//not logged in
app.get('/', (req, res) => {
	res.render('homePageLoggedOut')
})

//already logged in
app.get('/home', (req, res) => {
	if (req.session.logged_in) {
		res.render('homePage')
	} else {
		res.send('not logged in')
	}
})

// post send through body the trail name -- JUST to find the trail id

// get single trail
// app.get('/results/:name', async (req, res) => {
// 	// const foundTrailId = await Trail.findOne({
// 	// 	where: {
// 	// 		trail_name: req.params.name,
// 	// 	},
// 	// })

// 	console.log('----Search Button Pressed-----')

// 	const foundTrail = await Trail.findOne({
// 		where: {
// 			id: foundTrailId.id,
// 		},
// 		include: [Playlist],
// 	})
// 	if (!foundTrail) {
// 		return res.status(401).json({ msg: 'invalid Trail this error ' })
// 	}

// 	console.log('---------GET RESULTS PAGE---------')
// 	console.log(foundTrail)
// 	console.log(foundTrail.Playlists[1])

// 	res.render('resultPage', foundTrail.toJSON())
// })

app.get('/results/:name', async (req, res) => {
	// const foundTrailId = await Trail.findOne({
	// 	where: {
	// 		trail_name: req.params.name,
	// 	},
	// })

	console.log('----Search Button Pressed-----')

	const foundTrail = await Trail.findOne({
		where: {
			trail_name: req.params.name,
		},
		include: [{
			model:Playlist
			}]
	})
	if (!foundTrail) {
		return res.status(401).json({ msg: 'invalid Trail this error ' })
	}
	const foundTrailRaw = foundTrail.toJSON()
	console.log('---------GET RESULTS PAGE---------')
	console.log(foundTrailRaw)

	res.render('resultPage', foundTrailRaw)
})

app.get('/api/playlist', async (req, res) => {
	Playlist.findAll()
		.then((data) => {
			res.json(data)
		})
		.catch((err) => {
			res.status(500).json({ msg: 'ERROR', err })
		})
})

app.post('/api/playlist', async (req, res) => {
	console.log("--------SUBMIT PLAYLIST PRESSED----------")
	try {
		console.log('PLAYLIST BUTTON PRESSED')

		const playlistData = await Playlist.create({

			playlist_title:req.body.playlistTitle, 
			playlist_link:req.body.playlistLink,
			UserId: req.session.user_id
			
		})
		playlistData.addTrail(req.body.trailId)
		console.log('----SUCCESS PLAYLIST----')
		console.log(playlistData)
		
		res.status(200).json(playlistData)
	} catch (err) {
		console.log(err)
		console.log('error in making playlist')
	}
})


app.get('/register', (req, res) => {
	console.log('---------REGISTER PAGE GENERATED---------')
	res.render('register')
})
app.post('/register', async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		const userData = await User.create({
			username: req.body.username,
			password: hashedPassword,
		})

		req.session.save(() => {
			req.session.user_id = userData.id
			req.session.logged_in = true

			res.redirect('/home')
		})
	} catch (err) {
		res.status(400).json({ msg: 'error in registering user', error: err })
	}
})


app.get('/login', (req, res) => {
	console.log('-----------LOGIN PAGE GENERATED------------')
	res.render('login')
})


app.post('/login', async (req, res) => {
	console.log('-------LOGIN BUTTON PRESSED-------')
	try {
		const foundUser = await User.findOne({
			where: {
				username: req.body.username,
			},
		})
		res.render
		if (!foundUser) {
			res.status(400).json({ msg: 'incorrect username' })
			return
		}

		if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
			res.status(400).json({ msg: 'incorrect password' })
			return
		}
		req.session.save(() => {
			req.session.user_id = foundUser.id
			req.session.logged_in = true

			res.redirect('/home')
		})
	} catch (err) {
		res.status(400).json({ msg: 'error in logging in', error: err })
	}
})

app.get('/logout', function (req, res) {
	req.session.destroy()
	// res.clearCookie('connect.sid', cookieOptions) // This throws 500 error

	res.redirect('/login')
})

// turn on routes
app.use('/', routes)

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log('Now listening ' + PORT))
})
