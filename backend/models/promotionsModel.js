const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance

// Define the Promotions model
const Promotions = sequelize.define('Promotions', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Ensure code is unique
  },
  discountPercentage: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true // Default value is true
  }
});

// // Sync the model with the database
// async function syncModel() {
//   try {
//     await Promotions.sync({ alter: true });
//     console.log("Promotions model synchronized successfully.");
//   } catch (error) {
//     console.error("Error synchronizing Promotions model:", error);
//   }
// }

// // // Call the syncModel function to synchronize the model with the database
// syncModel();

// Export the Promotions model for use in other parts of the application
module.exports = Promotions;
