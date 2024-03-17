const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('MainMovie', 'postgres', 'Sql@10071999', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
