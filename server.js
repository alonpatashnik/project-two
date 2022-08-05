const express = require('express')
// const routes = require('./routes')
const sequelize = require('./config/connection')
// const { Trail, User, Playlist } = require('./models')
const exphbs = require('express-handlebars')
// const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Static directory
app.use(express.static('public'))

const hbs = exphbs.create({})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
	res.render('login')
})
// turn on routes
// app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
	app.listen(PORT, () => console.log('Now listening ' + PORT))
})
