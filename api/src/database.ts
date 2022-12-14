import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

mongoose.connect(process.env.MONGO_DB || 'mongodb://localhost:27017/interview_blocker')
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err))