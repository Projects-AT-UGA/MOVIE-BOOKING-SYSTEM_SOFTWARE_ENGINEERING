const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Otp=require("../models/otpModel")
const nodemailer = require('nodemailer');
const sequelize = require('sequelize');
const validator = require('validator');
const sendotp=async (req, res)=> {
  const { email } = req.body;
 // Check if the username or email already exists
 const existingUser = await User.findOne({
  where: {
    email: email 
  }
});

if (existingUser) {
  return res.status(400).json({ message: "Username or email already exists" });
}
  try {
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use Gmail as the email service
        auth: {
          user: 'harshith.ylbf52@gmail.com', // Your Gmail email address
          pass: 'cbij pteq kmqf qhrv' // Your Gmail password or app password
        }
      });

    const mailOptions = {
      from: 'harshith.ylbf52@gmail.com',
      to: email,
      subject: 'Verification Code for Signup',
      text: `Your verification code is: ${otp}`
    };

    transporter.sendMail(mailOptions, async(error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
      const existingOtp = await Otp.findOne({
        where: {
          email: email 
        }
      });
     
      if(existingOtp){
        const updatedOtp = await Otp.update(
          { otp: otp }, 
          { where: { email: email } } 
        );
        
      }
      else{
        const createotp = await Otp.create({
          email:email,
          otp:otp
        });
      }
     
      res.status(200).json({ message: "OTP sent successfully to the provided email." });
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}




const signup= async (req, res) => {
    const { country, username, email, dob, phoneNumber, password, address, subscribeForPromotions,otp } = req.body;
    

    try {
        // Validate fields using validator package
        if (!validator.isAlpha(country)) {
            return res.status(400).json({ message: "Invalid country format" });
        }

        if (!validator.isAlphanumeric(username)) {
            return res.status(400).json({ message: "Username must be alphanumeric" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!validator.isDate(dob)) {
            return res.status(400).json({ message: "Invalid date of birth format" });
        }

        if (!validator.isMobilePhone(phoneNumber, 'any', { strictMode: false })) {
            return res.status(400).json({ message: "Invalid phone number format" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Password is not strong enough" });
        }

        // Validate other fields using express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
     
      // Check if the username or email already exists
      const existingOtp = await Otp.findOne({
        where: {
          [sequelize.Op.and]:[
            {email: email },
            {otp:otp}
          ]
        }
      });
      if(!existingOtp){
        return res.status(400).json({ message: "otp is wrong" });
      }
      const existingUser = await User.findOne({
        where: {
          [sequelize.Op.or]: [
            { username: username },
            { email: email }
          ]
        }
      });
  
      if (existingUser) {
        return res.status(400).json({ message: "Username or email already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = await User.create({
        country: country,
        username: username,
        email: email,
        dob: dob,
        phoneNumber: phoneNumber,
        password: hashedPassword,
        address: address,
        subscribeForPromotions: subscribeForPromotions
      });
      const updatedOtp = await Otp.update(
        { otp: "" }, 
        { where: { email: email } } 
      );
      // Respond with the newly created user
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error signing up user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
}


  module.exports={signup,sendotp}