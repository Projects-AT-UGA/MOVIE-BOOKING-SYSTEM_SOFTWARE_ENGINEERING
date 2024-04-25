const express = require("express");
const adminRouter = express.Router();
const {Users,Movies,Promo,ShowTime}= require("../controllers/adminController");

facade=new Users();
console.log(facade.getusers);
adminRouter.get("/", facade.getusers);
adminRouter.post("/", facade.postusers);
adminRouter.delete("/:id", facade.deleteusers);
adminRouter.patch("/:id", facade.updateusers);

facade=new Movies();
adminRouter.get("/movies", facade.getmovies);
adminRouter.post("/movies", facade.postmovies);
adminRouter.delete("/movies/:id", facade.deletemovies);
adminRouter.patch("/movies/:id", facade.updatemovies);

facade=new Promo();
adminRouter.get("/promotions", facade.getpromotions);
adminRouter.post("/promotions", facade.postpromotions);
adminRouter.delete("/promotions/:id", facade.deletepromotions);
adminRouter.patch("/promotions/:id", facade.updatepromotions);

facade=new ShowTime();
adminRouter.get("/showdetails", facade.getShowDetails);
adminRouter.post("/showdetails", facade.postShowDetail);
adminRouter.delete("/showdetails/:id", facade.deleteShowDetail);
adminRouter.patch("/showdetails/:id", facade.updateShowDetail);

module.exports = adminRouter;