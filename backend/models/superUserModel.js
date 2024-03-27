const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance

const SuperUser = sequelize.define('SuperUser',{
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Ensure email is unique
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// (async () => {
//     try {
//         await SuperUser.sync();
//         console.log('SuperUser model synced successfully');
//     } catch (error) {
//         console.error('Error syncing SuperUser model:', error);
//     }
// })();

module.exports = SuperUser;
