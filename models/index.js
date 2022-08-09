const User = require('./User');
const Playlist = require('./Playlist');
const Trail = require('./Trail');


User.hasMany(Playlist)

Playlist.belongsTo(User)
    

Playlist.belongsToMany(Trail, {
    through: 'playlistTrail'
    
})

Trail.belongsToMany(Playlist, {
    through: 'playlistTrail'
    
})


module.exports = { User, Playlist, Trail };