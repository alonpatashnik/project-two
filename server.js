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

app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
	})
)

// Static directory
app.use(express.static('public'))

const hbs = exphbs.create({})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

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
		if(!foundTrail) {
			return res.status(401).json('invalid Trail')
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
