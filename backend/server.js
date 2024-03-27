const express = require('express');
const app = express();
const movieRoutes = require('./routes/movieRoutes');
const userRouter=require("./routes/userRoutes");
const editRouter=require("./routes/userEditRouter")
const adminRouter=require("./routes/adminRoutes")
const cardRouter=require("./routes/cardRoutes")
const superuserRouter=require("./routes/superuserRoutes")
const protectEachUser=require("./MiddleWare/ProtectingEachUser")
const protectAllAdmin=require("./MiddleWare/ProtectingAdmin")
require("dotenv").config()
const cors=require("cors")


app.use(express.json());
app.use(cors());
// Routes
// app.use("/superuser",superuserRouter)
app.use("/superuser",superuserRouter)
app.use("/admin",protectAllAdmin);
app.use("/admin",adminRouter);


app.use('/users',userRouter);
app.use("/user",protectEachUser)
app.use('/user',editRouter);

// app.use("/card",protectEachUser)
// app.use("/card",cardRouter);

app.use('/api', movieRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
