const express = require("express");
const adminRouter = express.Router();
const FacadeInterface = require("../controllers/adminController");

const facade = new FacadeInterface();

adminRouter.get("/", facade.getusers);
adminRouter.post("/", facade.postusers);
adminRouter.delete("/:id", facade.deleteusers);
adminRouter.patch("/:id", facade.updateusers);

adminRouter.get("/movies", facade.getmovies);
adminRouter.post("/movies", facade.postmovies);
adminRouter.delete("/movies/:id", facade.deletemovies);
adminRouter.patch("/movies/:id", facade.updatemovies);

adminRouter.get("/promotions", facade.getpromotions);
adminRouter.post("/promotions", facade.postpromotions);
adminRouter.delete("/promotions/:id", facade.deletepromotions);
adminRouter.patch("/promotions/:id", facade.updatepromotions);

adminRouter.get("/showdetails", facade.getShowDetails);
adminRouter.post("/showdetails", facade.postShowDetail);
adminRouter.delete("/showdetails/:id", facade.deleteShowDetail);
adminRouter.patch("/showdetails/:id", facade.updateShowDetail);

module.exports = adminRouter;