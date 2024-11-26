import   dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './lib/db.js';
dotenv.config({
    path: './.env',

})
const app = express();
const port = process.env.PORT || 5001

//routes 


connectDB()
app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
})
