const router = require('express').Router()
const apiRoutes = require('./api')
const { User, Trail, Playlist } = require('../models')
const { where } = require('sequelize')

router.use('/api', apiRoutes)

module.exports = router
