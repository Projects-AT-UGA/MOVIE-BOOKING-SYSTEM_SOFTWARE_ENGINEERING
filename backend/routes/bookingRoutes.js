const express=require("express")
const bookingRouter=express.Router()
const {getShowDetailsForMovie}=require("../controllers/bookingController")


bookingRouter.get("/:id",getShowDetailsForMovie)

module.exports=bookingRouter