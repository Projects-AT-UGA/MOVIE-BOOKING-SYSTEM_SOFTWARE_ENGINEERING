const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance
const User=require("./userModel")
// Define the User model
const Otp = sequelize.define('Otp', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Ensure email is unique
  },
  otp:{
    type: DataTypes.STRING,
    allowNull: false,
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
// // //Define the relationship between User and Otp

// User.hasOne(Otp, { foreignKey: 'userId' });
// Otp.belongsTo(User);

// // // Ensure database synchronization
// (async () => {
//   await sequelize.sync({ alter: true });
//   console.log("Database synchronized successfully.");
// })();


// // // Call the syncModel function to synchronize the model with the database
// syncModel();
module.exports=Otp