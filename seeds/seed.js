require("dotenv").config();

const sequelize = require('../config/connection')
const seedTrailData = require('./traildata')
const seedUserData = require('./userdata')
const seedPlaylistData = require('./playlistdata')


const { User, Playlist, Trail } = require('../models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const trails = await seedTrailData()
  console.log("\n-----------TRAIL DATA SEEDED-------------\n")
  const playlists = await seedPlaylistData();
  console.log("\n-----------PLAYLIST DATA SEEDED-------------\n")
  const users = await seedUserData();
  console.log("\n-----------USER DATA SEEDED-------------\n")
  await users[0].addPlaylists([1, 3, 4])
  await trails[714].addPlaylists([1, 2, 3, 4])
  process.exit(0);
};

seedDatabase();

module.exports = {users, trails, playlists}