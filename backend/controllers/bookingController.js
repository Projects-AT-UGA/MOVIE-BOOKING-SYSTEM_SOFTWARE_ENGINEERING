const ShowDetail = require("../models/ShowDetailsModel");


const getShowDetailsForMovie = async (req, res) => {
    
    try {
      console.log(req.body)
      const showDetails = await ShowDetail.findAll({ include: Movie });
      res.status(200).json(showDetails);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Error getting show details" });
    }

};
  
module.exports={getShowDetailsForMovie}