const User = require('./User');
const Playlist = require('./Playlist');
const Trail = require('./Trail');

User.hasMany(Playlist, {
    foreignKey: 'id'
})

Playlist.belongsToMany(User, {through: 'userPlaylist'})


module.exports = { User, Playlist, Trail };