const { Sequelize } = require('sequelize');

class Database {
  constructor() {
    if (!Database.instance) {
      this.sequelize = new Sequelize('Movie_Booking', 'postgres', 'postgres', {
        host: 'localhost',
        dialect: 'postgres',
        port: 5439
      });
      Database.instance = this;
    }
    return Database.instance;
  }
}

const singletonDatabase = new Database();
Object.freeze(singletonDatabase);

module.exports = singletonDatabase.sequelize;
