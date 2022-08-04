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
    latitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false
    },
    trail_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dist_type: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.FLOAT
    },
    report_date: {
      type: DataTypes.DATE
    },
    sum_of_distance: {
      type: DataTypes.FLOAT
    },
    sum_of_gain: {
      type: DataTypes.FLOAT
    },
    rating_count: {
      type: DataTypes.INTEGER
    }
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