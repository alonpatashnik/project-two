const sequelize = require('../config/connection')
const seedTrailData = require('./traildata.json')
const seedUserData = require('./userdata.json')
const seedPlaylistData = require('./playlistdata.json')


const { User, Playlist, Trail } = require('../models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const trails = await Trail.bulkCreate(seedTrailData);

  const users = await Trail.bulkCreate(seedUserData);

  const playlists = await Trail.bulkCreate(seedPlaylistData);

  process.exit(0);
};

seedDatabase();