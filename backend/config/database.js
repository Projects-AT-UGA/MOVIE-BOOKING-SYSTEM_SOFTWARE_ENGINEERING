const { Sequelize } = require('sequelize');

class Database {
  constructor() {
    if (!Database.instance) {
      this.sequelize = new Sequelize('Movie_Booking', 'postgres', 'Doremon@29', {
        host: 'localhost',
        dialect: 'postgres',
      });
      Database.instance = this;
    }
    return Database.instance;
  }
}

const singletonDatabase = new Database();
Object.freeze(singletonDatabase);

module.exports = singletonDatabase.sequelize;
