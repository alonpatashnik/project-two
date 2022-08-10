const router = require('express').Router()
const apiRoutes = require('./api')
const homeRoutes = require('./homeRoutes')
const resultRoutes = require('./resultRoute')

router.use('/api', apiRoutes)

module.exports = router
