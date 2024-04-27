const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    showId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    seatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1, // Minimum seat number
            max: 50, // Maximum seat number
            isInt: true // Ensure it's an integer
        }
    },
    type: {
        type: DataTypes.ENUM('Adult', 'Child', 'Senior'),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        get() {
            // Calculate price based on ticket type
            switch (this.getDataValue('type')) {
                case 'Adult':
                    return 50.00;
                case 'Child':
                    return 20.00;
                case 'Senior':
                    return 30.00;
                default:
                    return 0.00; // Default to 0 if type is not recognized
            }
        }
    },
}, {
    // Define unique constraint for the combination of seatNumber and bookingId
    indexes: [
        {
            unique: true,
            fields: ['seatNumber', 'showId'],
            name: 'unqiue_seat'
        }
    ]
});

// async function syncTickets() {
//     try {
//         await Ticket.sync({ force: true });
//         console.log('Ticket model synchronized successfully.');
//     } catch (error) {
//         console.error('Error synchronizing Ticket model:', error);
//     }
// }
// syncTickets()
module.exports = Ticket;
