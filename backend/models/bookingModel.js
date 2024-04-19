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
    
    // Add other fields as needed for the booking details
    // For example:
    // movieId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // showDetailId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // Add any other fields like booking date, payment status, etc.
});
Booking.hasMany(Ticket, { foreignKey: 'bookingId' });
Ticket.belongsTo(Booking, { foreignKey: 'bookingId', constraints: false }); // Each card detail belongs to one user

// Define associations

module.exports = Booking;
