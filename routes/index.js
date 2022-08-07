const router = require('express').Router();
const apiRoutes = require('./api');
const { User, Trail, Playlist } = require('../models');

router.use('/api', apiRoutes);

router.get("/",(req,res)=>{
    Trail.findAll().then(data=>{ 
        const Trails = data.map(trail=>{
            return trail.dataValues
        }).filter(trail=>{
            return trail.name.includes("Zig")
        }
        )
        res.json(Trails)
        
    }).catch(err=>{
        res.status(500).json({msg:"ERROR",err})
    })
})


module.exports = router;