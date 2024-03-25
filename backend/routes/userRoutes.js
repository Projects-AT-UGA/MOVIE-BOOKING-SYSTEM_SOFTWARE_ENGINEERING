const express = require('express');
const userRouter = express.Router();
const {signup,sendotp,login}=require("../controllers/userController")

userRouter.post('/sendotp',sendotp)


// POST /signup
// Controller function for user signup
userRouter.post('/signup',signup);
userRouter.post('/login',login);
module.exports = userRouter;





