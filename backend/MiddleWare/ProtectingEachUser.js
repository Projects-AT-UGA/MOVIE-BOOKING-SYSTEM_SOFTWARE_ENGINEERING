const jwt=require("jsonwebtoken")
const User=require("../models/userModel")
require("dotenv").config()
const protectEachUser=async(req,res,next)=>{
    
    try{   
        const {authorization}=req.headers
        const {user}=jwt.verify(authorization.split(" ")[1],process.env.AUTH_KEY)
        console.log(user)
        const userverified=await User.findOne({
        where:{
            id:user.id,
            email:user.email
        }
        })
        if(userverified.dataValues){
            req.user=userverified.dataValues;
        }
        next()
    }
    catch(error){
        res.status(400).json({message:"please attach a token"})
    }
    
    
}
module.exports=protectEachUser