const Movie = require('../models/movieModel');

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'please check input fields' });
    }
};

module.exports={getMovies}