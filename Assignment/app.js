const express = require('express');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');


//Security Middleware
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const connectDb = require('./config/db');
const router = require('./routes/api');

//Configure env
dotenv.config();

//Database
connectDb();


//Security Middleware Implement
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());
app.use(rateLimit());

//Body parser
app.use(bodyParser.json());

//Rate Limiter
const limiter = rateLimit({
    windowMS: 15*60*1000,
    max: 100
});

//Database



app.use("/api/sales",router);
app.get("/",(req,res)=>{
    res.send({message:"Welcome to sale app"});
})
module.exports = app;