const express=require("express")
const adminRouter=express.Router()
const { getusers, postusers, deleteusers, updateusers,
     getmovies, postmovies, deletemovies, updatemovies, 
     getpromotions, postpromotions, deletepromotions, updatepromotions,
     getShowDetails,postShowDetail,deleteShowDetail,updateShowDetail
    } = require("../controllers/adminController");



adminRouter.get("/",getusers)
adminRouter.post("/",postusers)
adminRouter.delete("/:id",deleteusers)
adminRouter.patch("/:id",updateusers)


adminRouter.get("/movies",getmovies)
adminRouter.post("/movies",postmovies)
adminRouter.delete("/movies/:id",deletemovies)
adminRouter.patch("/movies/:id",updatemovies)


adminRouter.get("/promotions",getpromotions)
adminRouter.post("/promotions",postpromotions)
adminRouter.delete("/promotions/:id",deletepromotions)
adminRouter.patch("/promotions/:id",updatepromotions)


adminRouter.get("/showdetails", getShowDetails);
adminRouter.post("/showdetails", postShowDetail);
adminRouter.delete("/showdetails/:id", deleteShowDetail);
adminRouter.patch("/showdetails/:id", updateShowDetail);

module.exports=adminRouter