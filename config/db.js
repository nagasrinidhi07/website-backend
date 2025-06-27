import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nagasrinidhi:07041001@cluster0.l46hv.mongodb.net/website').then(()=>console.log("DB Connected"));
};