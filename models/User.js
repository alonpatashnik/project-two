const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model { }

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'password',
    },
    playlist_link: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    author_id: {
      type: DataTypes.STRING,
      allowNull: false,

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

module.exports = User;