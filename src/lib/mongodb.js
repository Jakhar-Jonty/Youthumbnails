const MONGODB_URI = "mongodb+srv://Jonty007:Jakhar1997@cluster0.oouz8my.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
import mongoose from "mongoose";

let isConnected = false; // global variable to track connection

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Youthumbnails", // change db name if needed
    });

    isConnected = true;
    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("❌ MongoDB connection error:", error);
  }
};
