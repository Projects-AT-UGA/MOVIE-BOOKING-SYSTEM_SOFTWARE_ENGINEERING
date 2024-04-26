const express = require("express");
const adminRouter = express.Router();
const Facade = require("../controllers/adminController");

const facade = new Facade();

// Users routes
adminRouter.get("/", async (req, res) => {
  await facade.getUsers(req, res);
});

adminRouter.post("/", async (req, res) => {
  await facade.createUser(req, res);
});

adminRouter.delete("/:id", async (req, res) => {
  await facade.deleteUser(req, res);
});

adminRouter.patch("/:id", async (req, res) => {
  await facade.updateUser(req, res);
});

// Promotions routes
adminRouter.get("/promotions", async (req, res) => {
  await facade.getPromotions(req, res);
});

adminRouter.post("/promotions", async (req, res) => {
  await facade.createPromotion(req, res);
});

adminRouter.delete("/promotions/:id", async (req, res) => {
  await facade.deletePromotion(req, res);
});

adminRouter.patch("/promotions/:id", async (req, res) => {
  await facade.updatePromotion(req, res);
});

// Movies routes
adminRouter.get("/movies", async (req, res) => {
  await facade.getMovies(req, res);
});

adminRouter.post("/movies", async (req, res) => {
  await facade.createMovie(req, res);
});

adminRouter.delete("/movies/:id", async (req, res) => {
  await facade.deleteMovie(req, res);
});

adminRouter.patch("/movies/:id", async (req, res) => {
  await facade.updateMovie(req, res);
});

// Show details routes
adminRouter.get("/showdetails", async (req, res) => {
  await facade.getShowDetails(req, res);
});

adminRouter.post("/showdetails", async (req, res) => {
  await facade.createShowDetail(req, res);
});

adminRouter.delete("/showdetails/:id", async (req, res) => {
  await facade.deleteShowDetail(req, res);
});

adminRouter.patch("/showdetails/:id", async (req, res) => {
  await facade.updateShowDetail(req, res);
});

module.exports = adminRouter;
