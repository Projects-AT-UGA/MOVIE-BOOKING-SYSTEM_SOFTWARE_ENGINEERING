const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Otp=require("../models/otpModel")
const nodemailer = require('nodemailer');
const sequelize = require('sequelize');
const validator = require('validator');
const jwt=require("jsonwebtoken")
require("dotenv").config()
const createToken = (id, email) => {
  // Define payload containing data to be encoded in the token
  const payload = {
    user: {
      id: id,
      email: email
    }
  };

  // Generate JWT token with payload, secret key, and options (optional)
  const token = jwt.sign(payload, process.env.AUTH_KEY, {
    expiresIn: '5d' // Example: Token expires in 1 hour
  });

  return token;
};

const sendotp=async (req, res)=> {
 
  try {
    const { email } = req.body;
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
   // Check if the username or email already exists
   const existingUser = await User.findOne({
    where: {
      email: email 
    }
  });
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
    res.status(500).json({ message: "please check input fields" });
  }
}


const login=async(req,res)=>{
  
  try{
    const {email,password}=req.body;
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
     }
    const existingUser = await User.findOne({
      where: {
        email: email 
      }
    });
    if(existingUser.issuspended){
      return res.status(400).json({ message: "you account has been banned" });
    }
    const passwordmatch=await bcrypt.compare(password,existingUser.password)
    if(passwordmatch){
      if(existingUser.isVerified){
        const token=createToken(existingUser.id,existingUser.email)
        res.status(200).json({email:email,token:token});
      }
      else{
        res.status(400).json({message:"user is not verified",signup:{country:existingUser.country, username:existingUser.username, email:existingUser.email, dob:existingUser.dob, phoneNumber:existingUser.phoneNumber, password:existingUser.password, address:existingUser.address, subscribeForPromotions:existingUser.subscribeForPromotions}});
      }
    }
    else{
      res.status(400).json({ message: "Please enter right password" });
    }
  }
  catch(error){
    res.status(500).json({ message: "please check input fields" });
  }
}

const signupunverified=async(req,res)=>{
  try {
    const { country, username, email, dob, phoneNumber, password, address, subscribeForPromotions } = req.body;

    // Validate fields using validator package
    if (!validator.matches(country, /^[A-Za-z\s]+$/)) {
      return res.status(400).json({ message: "Invalid country format" });
    }

    if (!validator.isAlphanumeric(username)) {
      return res.status(400).json({ message: "Username must be alphanumeric" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!validator.isDate(new Date(dob))) {
      return res.status(400).json({ message: "Invalid date of birth format" });
    }

    if (!validator.isMobilePhone(phoneNumber, 'any', { strictMode: false })) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password is not strong enough" });
    }

    // Check if the username or email already exists
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
      subscribeForPromotions: subscribeForPromotions,
      issuspended: false,
      isVerified:false
    });

    const token = createToken(newUser.id, newUser.email);

    // Respond with the newly created user and token
    res.status(200).json({ email: email, token: token });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "please check input fields" });
  }
}
const signup= async (req, res) => {
    try {
      const { country, username, email, dob, phoneNumber, password, address, subscribeForPromotions,otp } = req.body;
        // Validate fields using validator package
        if (!validator.matches(country, /^[A-Za-z\s]+$/)) {
          return res.status(400).json({ message: "Invalid country format" });
        }

        if (!validator.isAlphanumeric(username)) {
            return res.status(400).json({ message: "Username must be alphanumeric" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (!validator.isDate(new Date(dob))) {
            return res.status(400).json({ message: "Invalid date of birth format" });
        }

        if (!validator.isMobilePhone(phoneNumber, 'any', { strictMode: false })) {
            return res.status(400).json({ message: "Invalid phone number format" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Password is not strong enough" });
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

      await existingOtp.destroy();
      if(existingUser){
        const token=createToken(existingUser.id,existingUser.email)
        await existingUser.update({ isVerified: true });
        res.status(200).json({email:email,token:token});
        return;
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
        subscribeForPromotions: subscribeForPromotions,
        issuspended:false,
        isVerified:true,
      });

      
      const token=createToken(newUser.id,newUser.email)
      
      // Respond with the newly created user
      res.status(200).json({email:email,token:token});
    } catch (error) {
      
      res.status(500).json({ message: "please check input fields" });
    }
}

const checkotp=async(req,res)=>{
  try {
    const { email, otp } = req.body;

    // Validation
    if (!email || !otp ) {
        return res.status(400).json({ message: "Please provide email, OTP" });
    }

    // Check if the OTP is valid
    const existingOtp = await Otp.findOne({
        where: {
            email: email,
            otp: otp
        }
    });
    if(existingOtp){
      res.status(200).json({ message: "otp verified" });
    }
    else{
      res.status(400).json({ message: "otp is wrong" });
    }
    
} catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "please check input fields" });
}
}


const editpassword = async (req, res) => {
  try {
      const { email, otp, password } = req.body;

      // Validation
      if (!email || !otp || !password) {
          return res.status(400).json({ message: "Please provide email, OTP, and new password" });
      }

      // Check if the OTP is valid
      const existingOtp = await Otp.findOne({
          where: {
              email: email,
              otp: otp
          }
      });

      if (!existingOtp) {
          return res.status(400).json({ message: "Invalid OTP" });
      }

      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update user password
      await user.update({ password: hashedPassword });

      // Clear the OTP after successful password update
      await existingOtp.destroy();

      res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ message: "please check input fields" });
  }
};


  module.exports={signupunverified,signup,sendotp,login,editpassword,checkotp}