const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Booking=require("./bookingModel")
const Ticket=require("./TicketModel")
const validTimes = ['08:00:00', '12:00:00', '16:00:00', '20:00:00'];

const validateTime = (value) => {
    const time = value.toTimeString().slice(0, 8);
    console.log(time)
    console.log(value)
    if (!validTimes.includes(time)) {
        throw new Error('Invalid show time');
    }
};

const ShowDetail = sequelize.define('ShowDetail', {
    screenid: {
        type: DataTypes.INTEGER,
        validate: {
            isIn: [[1, 2, 3]]
        }
    },
    showDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
            customValidator(value) {
                validateTime(value);
            }
        }
    },
    MovieId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      
}, {
    // Define unique constraint for the combination of showDateTime and screenid
    indexes: [
        {
            unique: true,
            fields: ['showDateTime', 'screenid'],
            name: 'unique_showdatetime_screenid'
        }
    ]
});


ShowDetail.hasMany(Booking, { foreignKey: 'showId' });
Booking.belongsTo(ShowDetail, { foreignKey: 'showId', constraints: false }); // Each card detail belongs to one user

ShowDetail.hasMany(Ticket, { foreignKey: 'showId' });
Ticket.belongsTo(ShowDetail, { foreignKey: 'showId', constraints: false });

// const sync = async () => {
//     try {
//         await ShowDetail.sync({ force: true });
//         console.log('ShowDetail table synchronized successfully.');
//     } catch (error) {
//         console.error('Error synchronizing ShowDetail table:', error);
//     }
// };
// sync()

module.exports = ShowDetail;
