const User = require('./User');
const Playlist = require('./Playlist');
const Trail = require('./Trail');

User.hasMany(Playlist, {
    foreignKey: 'playlist_title'
})

Playlist.belongsToMany(User, {through: 'userPlaylist'})


module.exports = { User, Playlist, Trail };