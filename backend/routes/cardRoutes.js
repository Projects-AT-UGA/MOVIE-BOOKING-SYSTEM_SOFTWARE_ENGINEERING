const express=require("express")

const cardRouter=express.Router()
const {getCardDetails,postCardDetails,deleteCardDetails,updateCardDetails}=require("../controllers/cardController")

cardRouter.get("/",getCardDetails)
cardRouter.post("/",postCardDetails)
cardRouter.delete("/:id",deleteCardDetails)
cardRouter.patch("/:id",updateCardDetails)

module.exports=cardRouter