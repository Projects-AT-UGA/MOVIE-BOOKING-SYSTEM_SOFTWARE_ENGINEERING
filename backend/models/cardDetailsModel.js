const { Sequelize, DataTypes } = require('sequelize');
const CryptoJS = require('crypto-js');
const sequelize = require('../config/database'); // Import the Sequelize instance
const User = require('./userModel');
const Booking=require("./bookingModel")
// Load environment variables from .env file
require('dotenv').config();

// Define the CardDetail model
const CardDetail = sequelize.define('CardDetail', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    get() {
      const encryptedValue = this.getDataValue('cardNumber');
      const bytes = CryptoJS.AES.decrypt(encryptedValue, process.env.SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    },
    set(value) {
      const encryptedValue = CryptoJS.AES.encrypt(value, process.env.SECRET_KEY).toString();
      this.setDataValue('cardNumber', encryptedValue);
    }
  },
  cardHolderName: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const encryptedValue = this.getDataValue('cardHolderName');
      const bytes = CryptoJS.AES.decrypt(encryptedValue, process.env.SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    },
    set(value) {
      const encryptedValue = CryptoJS.AES.encrypt(value, process.env.SECRET_KEY).toString();
      this.setDataValue('cardHolderName', encryptedValue);
    }
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cvv: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const encryptedValue = this.getDataValue('cvv');
      const bytes = CryptoJS.AES.decrypt(encryptedValue, process.env.SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    },
    set(value) {
      const encryptedValue = CryptoJS.AES.encrypt(value, process.env.SECRET_KEY).toString();
      this.setDataValue('cvv', encryptedValue);
    }
  },
  cardType: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const encryptedValue = this.getDataValue('cardType');
      const bytes = CryptoJS.AES.decrypt(encryptedValue, process.env.SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    },
    set(value) {
      const encryptedValue = CryptoJS.AES.encrypt(value, process.env.SECRET_KEY).toString();
      this.setDataValue('cardType', encryptedValue);
    }
  },
  billingAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const encryptedValue = this.getDataValue('billingAddress');
      const bytes = CryptoJS.AES.decrypt(encryptedValue, process.env.SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    },
    set(value) {
      const encryptedValue = CryptoJS.AES.encrypt(value, process.env.SECRET_KEY).toString();
      this.setDataValue('billingAddress', encryptedValue);
    }
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

CardDetail.hasMany(Booking, { foreignKey: 'cardId' });
Booking.belongsTo(CardDetail, { foreignKey: 'cardId', constraints: false }); // Each card detail belongs to one user



// // Sync the model with the database
// async function syncModel() {
//   try {
//     await CardDetail.sync({ alter: true });
//     console.log("CardDetail model synchronized successfully.");
//   } catch (error) {
//     console.error("Error synchronizing CardDetail model:", error);
//   }
// }

// syncModel();

// Export the CardDetail model for use in other parts of the application
module.exports = CardDetail;
