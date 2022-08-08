const router = require('express').Router();
const { User, Trail, Playlist } = require('../../models');

router.get("/",(req,res)=>{
    Playlist.findAll().then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"ERROR",err})
    })
})


router.post('/', async (req, res) => {
    
})

module.exports = router