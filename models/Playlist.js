const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Playlist extends Model {}

Playlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    playlist_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
    },
    upvotes: {
      type: DataTypes.INTEGER,
    },
    playlist_link: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    author_id: {
        type: DataTypes.STRING,
        allowNull: true,
        
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'playlist'
  }
);

module.exports = Playlist;