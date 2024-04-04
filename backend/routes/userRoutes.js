const express = require('express');
const userRouter = express.Router();
const {signupunverified,signup,sendotp,login,editpassword, checkotp}=require("../controllers/userController")

userRouter.post('/sendotp',sendotp)


// POST /signup
// Controller function for user signup
userRouter.post('/signupunverified',signupunverified)
userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.post('/forgotpassword',editpassword);
userRouter.post("/checkotp",checkotp)

module.exports = userRouter;





