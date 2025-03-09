import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

const dbConnect = (req, res) => {
  try {
    mongoose.connect(process.env.MONGOURL);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default dbConnect;
