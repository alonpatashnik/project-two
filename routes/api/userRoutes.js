const router = require('express').Router()
const { User, Trail, Playlist } = require('../../models')

router.get('/', (req, res) => {
	User.findAll()
		.then((data) => {
			res.json(data)
		})
		.catch((err) => {
			res.status(500).json({ msg: 'ERROR', err })
		})
})

module.exports = router
