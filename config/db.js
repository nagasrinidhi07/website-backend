import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://nagasrinidhi:07041001@cluster0.l46hv.mongodb.net/website'
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(" MongoDB Connection Error:", error.message);
    process.exit(1); // Stop the server if DB fails to connect
  }
};
