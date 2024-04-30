const ShowDetail = require("../models/ShowDetailsModel");
const Movie=require("../models/movieModel");
const Ticket=require("../models/TicketModel")
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

const getTicketSeatNumbers = async (req, res) => {
  try {
      const fetchedTickets = await Ticket.findAll({
          where: {
              showId: req.params.id
          }
      });

      // Extract seat numbers from fetched tickets
      const seatNumbers = fetchedTickets.map(ticket => ticket.seatNumber);

      // Return the seat numbers
      res.status(200).json(seatNumbers);
  } catch (error) {
      console.error("Error fetching tickets:", error);
      res.status(500).json({ error: "please check input fields" });
  }
}


module.exports={getShowDetailsForMovie,getTicketSeatNumbers}