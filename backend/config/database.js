const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Movie_Booking', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5439
});

module.exports = sequelize;
