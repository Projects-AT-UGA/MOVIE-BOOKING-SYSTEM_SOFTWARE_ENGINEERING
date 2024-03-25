const express=require("express")
const adminRouter=express.Router()
const {getusers,postusers,deleteusers,updateusers}=require("../controllers/adminController")



adminRouter.get("/",getusers)
adminRouter.post("/",postusers)
adminRouter.delete("/:id",deleteusers)
adminRouter.patch("/:id",updateusers)


module.exports=adminRouter