import mongoose from "mongoose";

export const connectDb = async(): Promise<void> => {
    const uri = process.env.MONGO_URI;

    if(!uri){
        throw new Error("MONGO_URI is not defined in .env");
    }

    try{
        await mongoose.connect(uri);
        console.log("MongoDB connected");
    }catch(err){
        console.log("MongoDB connection failed");
        process.exit(1);
    }
}