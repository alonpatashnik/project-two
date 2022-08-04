const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trail extends Model {}

Trail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    trail_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    trail_type: {
      type: DataTypes.STRING
    },
    trail_distance: {
      type: DataTypes.FLOAT
    },
    elevation_change: {
        type: DataTypes.FLOAT
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = Trail;