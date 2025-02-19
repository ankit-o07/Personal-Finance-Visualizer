// lib/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
};

export default connectDB;
