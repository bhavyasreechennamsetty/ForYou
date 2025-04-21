import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
    console.log("✅ MongoDB connection successful");
  } catch (error) {
    console.error("❌ Initial MongoDB connection failed:", error);
    process.exit(1); // Optional: Stop the server on DB failure
  }
};

export default connectDB;

