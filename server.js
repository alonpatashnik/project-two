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

// app.METHOD(PATH, HANDLER)

app.get('/', (req, res) => {
	//res.json("Hello World")
	res.render('homePage')
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
//----------------------------------------------------------------------
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
		res.status(200).render('homePage')
	} catch (err) {
		console.log(err)
	}
})
// app.post('/login', (req, res) => {
// 	User.findOne({
// 		where: {
// 			username: req.body.username,
// 		},
// 	})
// 		.then((foundUser) => {
// 			if (!foundUser) {
// 				return res.status(401).json({ msg: 'invalid username' })
// 			}
// 			if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
// 				return res.status(401).json({ msg: 'invalid password' })
// 			}
// 			req.session.loggedin = true
// 			req.session.username = req.body.username
// 			res.status(200).json(foundUser)
// 			res.redirect('/home')
// 		})
// 		.catch((err) => {
// 			console.log('ERROR' + err)
// 		})
// })
app.get('/home', (req, res) => {
	if (req.session.loggedin) {
		res.send('welcome back, ' + req.session.username + '!')
	} else {
		res.send('not logged in')
	}
})
// turn on routes
app.use('/', routes)

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log('Now listening ' + PORT))
})
