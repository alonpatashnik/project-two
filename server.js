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
		db: sequelize
	})
};

app.use(session(sess));

// Static directory
app.use(express.static('public'))

const hbs = exphbs.create({})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// THIS SHOULD NOW BE COVERED IN homeRoutes.js
//not logged in
app.get('/', (req, res) => {
	res.render('homePage')
	//res.json("Hello World")
})

//already logged in
app.get('/home', (req, res) => {
	if (req.session.loggedin) {
		res.render('homePage')
	} else {
		res.send('not logged in')
	}
})

app.get('/results', (req, res) => {
	console.log('---------GET RESULTS PAGE---------')
	res.render('resultPage', req.session.trail)
})
app.post('/home', async (req, res) => {
	try {
		console.log('----Search Button Pressed-----')
		const foundTrail = await Trail.findOne({
			where: {
				trail_name: req.body.searchBar
			},
		})
		if (!foundTrail) {
			return res.status(401).json({ msg: 'invalid Trail this error ' })
		}
		// not loading to results page 
		console.log(foundTrail)
		req.session.trail = {
			id: foundTrail.id,
			trail_name: foundTrail.trail_name,
			region: foundTrail.region,
			sum_of_distance: foundTrail.sum_of_distance,
			sum_of_gain: foundTrail.sum_of_gain,
			dist_type: foundTrail.dist_type
		}
		res.status(200).redirect('/results')
	} catch {
		console.log('there was an error in selecting trail')
		res.redirect('home')
	}
})
app.get('/results', async (req, res) => {

	try {
		//populate the table
		const userPlaylists = await Playlist.findAll({
			where: {
				author_id: red.session.user.id
			}
		})
		if (!userPlaylists) {
			return res.status(404).json({ msg: 'no playlists for that user' })
		}
		console.log(userPlaylists)
		req.session.playlist = {
			author_id: userPlaylists.author_id,
			id: userPlaylists.id,
			username: req.session.username,
			playlist_link: userPlaylists.playlist_link,
			upvotes: userPlaylists.upvotes
		}
	} catch {
		console.log('error loading playlists')
	}
})


app.post('/results', async (req, res) => {
	try {
		console.log('PLAYLIST BUTTON PRESSED')
		Playlist.create({
			playlist_title: req.body.playlist_title,
			playlist_link: req.body.playlist_link,
			author_id: req.session.user.id

		}).catch((err) => {
			console.log('ERROR' + err)
		})
		console.log('----SUCCESS----')


	} catch {
		console.log('error in making playlist')
	}
})
app.get('/playlist', (req, res) => {
	Playlist.findAll()
		.then((data) => {
			res.json(data)
		})
		.catch((err) => {
			res.status(500).json({ msg: 'ERROR', err })
		})
})

// app.post('/results', async (req, res) => {
// 	try {
// 		console.log('-----------SUBMT BUTTON PRESSED----------')
// 		const newPlaylist = await User.create({

// 			req.body.submitPlaylist
// 			where: {
// 				playlist_title: req.body.playListTitle,
// 				playlist_link: req.body.playListLink,
// 			}
// 		})
// 		if(!newPlaylist) {
// 			res.status(401).json({ msg: 'invalid playlist this error ' })
// 		}
// 		console.log(newPlaylist)

// 	} catch { 
// 		console.log('error in adding playing list')
// 		console.log(err)
// 	}
// })

//-------------------This thing works------------------------------------
app.get('/register', (req, res) => {
	console.log('---------REGISTER PAGE GENERATED---------')
	res.render('register')
})
app.post('/register', async (req, res) => {
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
app.get('/login', (req, res) => {
	console.log('----------LOGIN PAGE GENERATED---------')
	res.render('login')
})
app.post('/login', async (req, res) => {
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
		req.session.user = {
			id: foundUser.id,
			username: foundUser.username,
		}
		//GO TO HOME PAGE
		res.status(200).redirect('/home')
	} catch (err) {
		console.log(err)
	}
})
//----------------------------------------------------------------------
// turn on routes
app.use('/', routes)

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log('Now listening ' + PORT))
})
