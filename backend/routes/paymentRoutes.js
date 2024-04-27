const express=require("express")
const paymentRouter=express.Router()
const {postPayment}=require("../controllers/paymentController")
paymentRouter.get("/",postPayment)

module.exports=paymentRouter