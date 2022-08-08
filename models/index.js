const User = require('./User');
const Playlist = require('./Playlist');
const Trail = require('./Trail');


User.belongsToMany(Playlist, {through: 'Userplaylist'})

Playlist.belongsToMany(User, {through: 'Userplaylist'})

Playlist.belongsTo(User)

User.hasMany(Playlist)

Playlist.belongsToMany(Trail, {through: 'Trailplaylist'})

Trail.belongsToMany(Playlist, {through: 'Trailplaylist'})

// user has many playlists (liked)
// playlist belongs to many user

//







module.exports = { User, Playlist, Trail };