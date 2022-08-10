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

router.get('/:id', (req, res) => {
	Trail.findByPk( req.params.id,{
        include: [{
            model:Playlist
            }]
        
        })
		.then((data) => {
            
			res.json(data)
		})
		.catch((err) => {
			res.status(500).json({ msg: 'ERROR', err })
		})
})

router.get('/:name', (req, res) => {
	Trail.findOne({
        where: {
			trail_name: req.params.name,
		}
    
    })
		.then((data) => {
            
			res.json(data)
		})
		.catch((err) => {
			res.status(500).json({ msg: 'ERROR', err })
		})
})


module.exports = router