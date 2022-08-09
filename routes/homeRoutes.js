const router = require('express').Router()
const { User, Trail, Playlist } = require('../models')
const withAuth = require('../utils/auth')
const session = require('express-session')

router.get('/home', withAuth, (req, res) => {
    res.render('homePage')
})


module.exports = router