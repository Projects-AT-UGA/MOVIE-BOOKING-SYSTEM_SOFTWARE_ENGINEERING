const ShowDetail = require("../models/ShowDetailsModel");
const Movie=require("../models/movieModel");

const getShowDetailsForMovie = async (req, res) => {
    try {
        const movieId = req.params.id; 
        const showDetails = await ShowDetail.findAll({
            where: { MovieId: movieId }, 
        });
      res.status(200).json(showDetails);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Error getting show details" });
    }
};


module.exports={getShowDetailsForMovie}