const express = require('express')
const routes = require('./routes')
const sequelize = require('./config/connection')
const { Trail, User, Playlist, playlistTrail } = require('./models')
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
})

//already logged in
app.get('/home', (req, res) => {
	if (req.session.loggedin) {
		res.render('homePage')
	} else {
		res.send('not logged in')
	}
})

// post send through body the trail name -- JUST to find the trail id 



// get single trail
app.get('/results/:name', async (req, res) => {
	
	// FIND ONE from db --- happen here 
	// results that come back from that db query -- thats the object that is passed in NOT a trail session 
	
	const foundTrailId = await Trail.findOne({
		where: {
			trail_name: req.params.name
		}
	});
	
	console.log('----Search Button Pressed-----')
	
	const foundTrail = await Trail.findOne({
		where: {
			id: foundTrailId.id
		},
		include: [Playlist]
	})
	if (!foundTrail) {
		return res.status(401).json({ msg: 'invalid Trail this error ' })
	}

	console.log('---------GET RESULTS PAGE---------')
	console.log(foundTrail)
	

	res.render('resultPage',foundTrail.toJSON())
})

app.get('/:name', async (req, res) => {
	
	// FIND ONE from db --- happen here 
	// results that come back from that db query -- thats the object that is passed in NOT a trail session 
	
	const foundTrailId = await Trail.findOne({
		where: {
			trail_name: req.params.name
		}
	});
	
	console.log('----Search Button Pressed-----')
	
	const foundTrail = await Trail.findOne({
		where: {
			id: foundTrailId.id
		},
		include: [Playlist]
	})
	if (!foundTrail) {
		return res.status(401).json({ msg: 'invalid Trail this error ' })
	}

	console.log('---------GET RESULTS PAGE---------')
	console.log(foundTrail)
	

	res.render('resultPage',foundTrail.toJSON())
})




app.post('/playlist', async (req, res) => {
	try {
		console.log('PLAYLIST BUTTON PRESSED')
		Playlist.create({
			

		}).catch((err) => {
			console.log('ERROR' + err)
		})
		console.log('----SUCCESS----')


	} catch {
		console.log('error in making playlist')
	}
})




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
