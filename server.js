const express = require('express')
// const routes = require('./routes')
const sequelize = require('./config/connection')
// const { Trail, User, Playlist } = require('./models')
const exphbs = require('express-handlebars')
// const SequelizeStore = require('connect-session-sequelize')(session.Store)
const bcrypt = require('bcrypt')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Static directory
app.use(express.static('public'))

const hbs = exphbs.create({})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

const users = []

app.get('/login', (req, res) => {
	res.render('login')
})
app.get('/register', (req, res) => {
	res.render('register')
})
app.post('/register', async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		users.push({
			name: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		})
		res.redirect('/login')
		//store users in database
	} catch {
		//reload if error
		console.log('there was an error in creating account')
		res.redirect('/register')
	}
	console.log(users)
	res.render('register')
})
// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
	app.listen(PORT, () => console.log('Now listening ' + PORT))
})
