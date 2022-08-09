const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class playlistTrail extends Model { }

playlistTrail.init(
  {
    playlist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: "playlist",
        key: "id"
      }
    },
    trail_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "trail",
          key: "id"
        }
      },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'playlisttrail'
  }
);

module.exports = playlistTrail;