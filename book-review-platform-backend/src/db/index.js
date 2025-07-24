import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async() => {
    try {
        console.log(`${process.env.MONGODB_URI}${DB_NAME}`);
        
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`, {
            writeConcern: { w: 1 },
            retryWrites: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
            maxPoolSize: 10,
            minPoolSize: 5,
            connectTimeoutMS: 10000,
            heartbeatFrequencyMS: 10000,
        })
        
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error ", error)
        process.exit(1)
    }
}

export default connectDB