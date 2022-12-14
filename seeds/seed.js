require("dotenv").config();

const sequelize = require('../config/connection')
const seedTrailData = require('./traildata')
const seedUserData = require('./userdata')
const seedPlaylistData = require('./playlistdata')



const { User, Playlist, Trail } = require('../models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedTrailData()
  console.log("\n-----------TRAIL DATA SEEDED-------------\n")
  await seedUserData();
  console.log("\n-----------USER DATA SEEDED-------------\n")
  const playlists = await seedPlaylistData();
  console.log("\n-----------PLAYLIST DATA SEEDED-------------\n")
  await playlists[0].addTrail(2);
  // await seedPlaylistTrailData();
  // console.log("\n-----------PLAYLISTTRAIL DATA SEEDED-------------\n")
  process.exit(0);
};

seedDatabase();