const { Playlist } = require('../models')

const playlistData = [
    {
        "playlist_title": "Wrestling with Adjectives",
        "tags": "peaceful",
        "upvotes": 35,
        "playlist_link": "https://open.spotify.com/playlist/0FCgn1i2TvoafMG0rRf6iI?si=4fd2298800414793",
        "UserId": 1
    },
    {
        "playlist_title": "Beats to Relax to",
        "tags": "focus",
        "upvotes": 51,
        "playlist_link": "https://youtu.be/jfKfPfyJRdk",
        "UserId": 4
    },
    {
        "playlist_title": "Pokemon Cities",
        "tags": "upbeat",
        "upvotes": 131,
        "playlist_link": "https://open.spotify.com/playlist/4PRZumvhyoOQNyo98Sj8ih?si=28c55ccc662d4cdb",
        "UserId": 4
    },
    {
        "playlist_title": "Ive Got My Mind Set On You",
        "tags": "happy",
        "upvotes": 87,
        "playlist_link": "https://open.spotify.com/playlist/37i9dQZF1E8PKwGoSUThTG?si=536bbe84d1bd4227",
        "UserId": 2
    }

]

const seedPlaylists = () => Playlist.bulkCreate(playlistData)

module.exports = seedPlaylists