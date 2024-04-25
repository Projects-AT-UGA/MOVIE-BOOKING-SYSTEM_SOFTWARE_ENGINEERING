const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Show = sequelize.define('Show', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  showTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  screenId: {
    type: DataTypes.INTEGER, // Assuming screenId is an integer, adjust as needed
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER, // Assuming duration is in minutes, adjust as needed
    allowNull: false
  }
}, {
  tableName: 'show', // Adjust the table name as needed
  timestamps: false // If you don't want createdAt and updatedAt fields
});

module.exports = Show;
