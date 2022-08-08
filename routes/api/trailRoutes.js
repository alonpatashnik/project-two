const router = require('express').Router();
const { User, Trail, Playlist } = require('../../models');



let usersTrail

router.get("/", (req, res) => {
    Trail.findAll().then(data => {

        res.status(200).json(data)

        usersTrail = data
        console.log(usersTrail)
        
    }).catch(err => {
        res.status(500).json({ msg: "ERROR", err })
    })
})

module.exports = router