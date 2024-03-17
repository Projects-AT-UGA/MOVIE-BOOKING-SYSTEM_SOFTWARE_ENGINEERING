const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    ratings: DataTypes.STRING,
    cast: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    rating: DataTypes.STRING,
    playing_now: DataTypes.BOOLEAN,
    trailer_picture: DataTypes.STRING,
    release_date: DataTypes.DATE,
    genre: DataTypes.STRING,
    trailer_video: DataTypes.STRING,
    director: DataTypes.STRING,
    producer: DataTypes.STRING,
    duration: DataTypes.STRING,
    visibility: DataTypes.STRING,
    certificate: DataTypes.STRING
});




// (async () => {
//     try {
//       await sequelize.sync({alter:"true"});
//       console.log('Table created successfully.');
//     } catch (error) {
//       console.error('Error creating table:', error);
//     } finally {
//       // Close the connection
//       sequelize.close();
//     }
//   })();
module.exports = Movie;


// Assuming you have already defined the Sequelize model for Movie





