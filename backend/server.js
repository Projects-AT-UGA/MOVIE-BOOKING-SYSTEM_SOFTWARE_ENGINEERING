const express = require('express');
const app = express();
const movieRoutes = require('./routes/movieRoutes');
const userRouter=require("./routes/userRoutes");
const editRouter=require("./routes/userEditRouter")
const protectEachUser=require("./MiddleWare/ProtectingEachUser")
require("dotenv").config()
const cors=require("cors")


app.use(express.json());
app.use(cors());
// Routes

app.use('/users',userRouter);
app.use("/user",protectEachUser)
app.use('/user',editRouter);
app.use('/api', movieRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
