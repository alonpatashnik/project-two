const User = require('./User');
const Playlist = require('./Playlist');
const Trail = require('./Trail');

User.belongsToMany(Playlist, { through: 'userPlaylist'})

Playlist.belongsToMany(User, {through: 'userPlaylist'})

User.hasMany(Playlist)

Playlist.belongsTo(User)

Trail.belongsToMany(Playlist, {through: 'trailPlaylist'})

Playlist.belongsToMany(Trail, {through: 'trailPlaylist'})


module.exports = { User, Playlist, Trail };