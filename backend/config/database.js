const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('MainMovie', 'postgres', 'ranga123', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
