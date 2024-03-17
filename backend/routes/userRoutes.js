const express = require('express');
const userRouter = express.Router();
const {signup,sendotp}=require("../controllers/userController")

userRouter.post('/sendotp',sendotp)


// POST /signup
// Controller function for user signup
userRouter.post('/signup',signup);

module.exports = userRouter;





