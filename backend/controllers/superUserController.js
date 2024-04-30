const SuperUser = require("../models/superUserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const createToken = (id, email) => {
    const payload = { user: { id, email } };
    const token = jwt.sign(payload, process.env.AUTH_KEY, { expiresIn: '5d' });
    return token;
};

// Signup function for SuperUser
const signup = async (email, password) => {
    try {
        // Check if email or password is empty
        if (!email || !password) {
            throw new Error("Email or password is empty");
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            throw new Error("Invalid email format");
        }

        // Validate password strength
        if (!validator.isStrongPassword(password)) {
            throw new Error("Password is not strong enough");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new SuperUser
        const newSuperUser = await SuperUser.create({ email, password: hashedPassword });

        return newSuperUser;
    } catch (error) {
        console.error("Error in SuperUser signup:", error);
        throw new Error("Error signing up SuperUser");
    }
};

// Login function for SuperUser
const login = async (req,res) => {
    try {
        // Find SuperUser by email
        const {email,password}=req.body;
        if(!email || !password){
            res.status(400).json( { message: "please enter a valid email and password" });
            return;
        }
        const superUser = await SuperUser.findOne({ where: { email } });
        if (!superUser) {
            res.status(400).json( { message: "SuperUser not found" });
            return;
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, superUser.password);
        if (!passwordMatch) {
            // throw new Error();
            res.status(400).json( { message: "Incorrect password" });
            return;
        }

        // Generate JWT token
        const token = createToken(superUser.id, superUser.email);
        res.status(200).json( { email: superUser.email, token });
    } catch (error) {
        
        res.status(400).json({message:"please check input fields"})
    }
};

module.exports = { signup, login };
