import mongoose from "mongoose";

let isConnected = false; // Global to preserve across function calls

const dbConnect = async (): Promise<void> => {
  if (isConnected) {
    // Prevent multiple connections
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      // Optional settings can go here
    });

    isConnected = db.connections[0].readyState === 1;

    if (isConnected) {
      console.log("✅ MongoDB connected successfully");
    } else {
      console.log("⚠️ MongoDB connected but in a weird state:", db.connections[0].readyState);
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};

export default dbConnect;

