const express = require("express");
const superuserRouter = express.Router();
const { signup, login } = require("../controllers/superUserController");

superuserRouter.post('/login', login);

// Check for command line arguments for signup
if (process.argv.length === 4) {
    const [nodePath, scriptPath, email, password] = process.argv;
    if (email && password) {
        // Call signup method with provided email and password
        signup(email, password)
            .then(newUser => {
                console.log("==============================super user created successfully:==========================", newUser);
                process.exit(); // Exit after signup
            })
            .catch(error => {
                console.error("==============================Error signing up SuperUser:==========================", error);
                process.exit(1); // Exit with error code
            });
    } else {
        console.error("==============================Email and password are required for signup==========================");
        process.exit(1); // Exit with error code
    }
}

module.exports = superuserRouter;
