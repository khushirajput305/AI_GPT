const express = require('express');
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors")
const bodyParser = require("body-parser")
const colors = require("colors");
const connectDB = require("./config/db");

//routes path
const authRoutes = require('./routes/authRoutes');
const openaiRoutes= require ('./routes/openaiRoutes')
const errorHandler = require("./middlewares/errorMiddleware");

//dotenv
dotenv.config();

//mongodb conncetion
connectDB();
//rest object
const app = express();

//middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan("dev"))
app.use(errorHandler)

const PORT = process.env.PORT || 8080;

//api routes
app.use('/api/v1/auth',authRoutes)
app.use("/api/v1/openai",openaiRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgCyan.white);
});
