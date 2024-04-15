const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


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
});

// const sync = async () => {
//     try {
//         await ShowDetail.sync({ alter: true });
//         console.log('ShowDetail table synchronized successfully.');
//     } catch (error) {
//         console.error('Error synchronizing ShowDetail table:', error);
//     }
// };
// sync()

module.exports = ShowDetail;
