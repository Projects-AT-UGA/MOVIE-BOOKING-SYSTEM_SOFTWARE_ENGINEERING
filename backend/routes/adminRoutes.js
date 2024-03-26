const express=require("express")
const adminRouter=express.Router()
const { getusers, postusers, deleteusers, updateusers,getmovies, postmovies, deletemovies, updatemovies }=require("../controllers/adminController")



adminRouter.get("/",getusers)
adminRouter.post("/",postusers)
adminRouter.delete("/:id",deleteusers)
adminRouter.patch("/:id",updateusers)


adminRouter.get("/movies",getmovies)
adminRouter.post("/movies",postmovies)
adminRouter.delete("/movies/:id",deletemovies)
adminRouter.patch("/movies/:id",updatemovies)
module.exports=adminRouter