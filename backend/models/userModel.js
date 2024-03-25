const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance

// Define the User model
const User = sequelize.define('User', {
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Ensure email is unique
  },
  dob: {
    type: DataTypes.DATEONLY, // Assuming you only need the date of birth
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subscribeForPromotions: {
    type: DataTypes.BOOLEAN,
    defaultValue: false // Default value is false
  }
  
});

// // Sync the model with the database
// async function syncModel() {
//   try {
//     await sequelize.sync({ alter: true });
//     console.log("User model synchronized successfully.");
//   } catch (error) {
//     console.error("Error synchronizing user model:", error);
//   }
// }

// // Call the syncModel function to synchronize the model with the database
// syncModel();

// Export the User model for use in other parts of the application
module.exports = User;
