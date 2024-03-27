const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance
const User = require('./userModel');

// Define the CardDetail model
const CardDetail = sequelize.define('CardDetail', {
  userId: {
    type: DataTypes.INTEGER, // Assuming userId refers to the ID of the user associated with the card details
    allowNull: false
  },
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  cardHolderName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cvv: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cardType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  billingAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false // Default value is false
  }
});

// Sync the model with the database
// async function syncModel() {
//   try {
//     await CardDetail.sync({ alter: true });
//     console.log("CardDetail model synchronized successfully.");
//   } catch (error) {
//     console.error("Error synchronizing CardDetail model:", error);
//   }
// }

// Call the syncModel function to synchronize the model with the database
// syncModel();

// Export the CardDetail model for use in other parts of the application
module.exports = CardDetail;
