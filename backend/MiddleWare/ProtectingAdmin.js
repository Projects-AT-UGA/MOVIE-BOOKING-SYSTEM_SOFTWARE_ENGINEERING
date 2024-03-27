const jwt=require("jsonwebtoken")
const SuperUser = require("../models/superUserModel");
require("dotenv").config()
const protectAllAdmin=async(req,res,next)=>{
    
    try{   
        const {authorization}=req.headers
        const {user}=jwt.verify(authorization.split(" ")[1],process.env.AUTH_KEY)
        
        const userverified=await SuperUser.findOne({
        where:{
            id:user.id,
            email:user.email
        }
        })
        if(!userverified){
            res.status(400).json({message:"super user does not exist"})
            return;
        }
        
        next()
    }
    catch(error){
        res.status(400).json({message:"please attach a token"})
    }
    
    
}
module.exports=protectAllAdmin