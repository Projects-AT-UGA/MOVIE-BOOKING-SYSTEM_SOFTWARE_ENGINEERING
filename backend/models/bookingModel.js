const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ticket=require("./TicketModel")
const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    showId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cardId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total:{
        type: DataTypes.INTEGER,
        allowNull: false, 
    }
});
Booking.hasMany(Ticket, { foreignKey: 'bookingId' });
Ticket.belongsTo(Booking, { foreignKey: 'bookingId', constraints: false }); // Each card detail belongs to one user

// async function syncBookingModel() {
//     try {
//       await Booking.sync({ force: true });
//       console.log("Booking model synchronized successfully.");
//     } catch (error) {
//       console.error("Error synchronizing booking model:", error);
//     }
//   }
  
//   syncBookingModel()
  


// Define associations

module.exports = Booking;
