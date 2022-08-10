const router = require('express').Router()
const { User, Trail, Playlist } = require('../models')
const withAuth = require('../utils/auth')
const session = require('express-session')

router.get('/result', withAuth, (req, res) => {
    res.render('homePage')
})

router.post('/playlist', async (req, res) => {
	console.log("--------SUBMIT PLAYLIST PRESSED----------")
	try {
		console.log('PLAYLIST BUTTON PRESSED')

		const playlistData = Playlist.create({
			playlist_title:req.body.playlistTitle, 
			playlist_link:req.body.playlistLink
		})
		console.log('----SUCCESS----')
		res.json({msg: 'success'})
	} catch {
		console.log('error in making playlist')
	}
})




module.exports = router