import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // ESTABLISH CONNECTION
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✔ Database Connected");
  } catch (error) {
    console.error("❌ Databsse connection failed: ", error.message);
  }
};

export default connectDB;
