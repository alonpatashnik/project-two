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
	//res.json("Hello World")
	res.render('homePage')
})

//already logged in
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
