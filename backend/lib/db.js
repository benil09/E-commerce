import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect (process.env.MONGO_URI)
        console.log(`MongoDB connected:${conn.connection.host}`);
    } catch (error) {
        console.log("error in connecting to MongoDB", error.message);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;