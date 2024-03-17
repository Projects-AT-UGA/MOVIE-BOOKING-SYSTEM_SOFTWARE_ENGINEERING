const express = require('express');
const app = express();
const movieRoutes = require('./routes/movieRoutes');
const userRouter=require("./routes/userRoutes")
const cors=require("cors")
app.use(express.json());
app.use(cors())


// Routes
app.use('/users',userRouter);
app.use('/api', movieRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
