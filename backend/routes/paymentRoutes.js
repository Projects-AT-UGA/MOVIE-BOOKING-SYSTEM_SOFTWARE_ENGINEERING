const express=require("express")
const paymentRouter=express.Router()
const { postPayment,postpromotions,getOrderHistory}=require("../controllers/paymentController")
paymentRouter.post("/",postPayment)
paymentRouter.post("/promotions",postpromotions)
paymentRouter.get("/orderhistory",getOrderHistory)
module.exports=paymentRouter