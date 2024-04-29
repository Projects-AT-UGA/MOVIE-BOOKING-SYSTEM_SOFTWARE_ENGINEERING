const express=require("express")
const paymentRouter=express.Router()
const { postPayment,postpromotions }=require("../controllers/paymentController")
paymentRouter.post("/",postPayment)
paymentRouter.post("/promotions",postpromotions)
module.exports=paymentRouter