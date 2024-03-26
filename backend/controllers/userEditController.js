const User=require("../models/userModel")
const bcrypt=require("bcrypt")
const validator=require("validator")


const getEditUser=async(req,res)=>{
    try{
        const {country,username,dob,phoneNumber,address,subscribeForPromotions}=req.user;
        res.status(200).json({country,username,dob,phoneNumber,address,subscribeForPromotions})
    }
    catch(error){
        res.status(400).json("Internal server error")
    }
}

const postEditUser = async (req, res) => {
    try {
        // Extract id, email, and password from req.body
        const {id}=req.user;
        const {  email, ...updatedFields } = req.body;
        
        // Validation checks
        if (updatedFields.country && !validator.matches(updatedFields.country, /^[A-Za-z\s]+$/)) {
            return res.status(400).json({ message: "Invalid country format" });
        }

        if (updatedFields.username && !validator.isAlphanumeric(updatedFields.username)) {
            return res.status(400).json({ message: "Username must be alphanumeric" });
        }

        if (updatedFields.email && !validator.isEmail(updatedFields.email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (updatedFields.dob && !validator.isDate(new Date(updatedFields.dob))) {
            return res.status(400).json({ message: "Invalid date of birth format" });
        }

        if (updatedFields.phoneNumber && !validator.isMobilePhone(updatedFields.phoneNumber, 'any', { strictMode: false })) {
            return res.status(400).json({ message: "Invalid phone number format" });
        }
        // Update user data
        const user = await User.findOne({ where: { id: id } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const temp=await user.update(updatedFields);
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        // console.error("Error editing user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};






module.exports={getEditUser,postEditUser}