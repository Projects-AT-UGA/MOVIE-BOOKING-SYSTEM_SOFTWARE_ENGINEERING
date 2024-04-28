const express=require("express")
const bookingRouter=express.Router()
const {getShowDetailsForMovie,getTicketSeatNumbers}=require("../controllers/bookingController")


bookingRouter.get("/:id",getShowDetailsForMovie)
bookingRouter.get("/tickets/:id",getTicketSeatNumbers)
module.exports=bookingRouter