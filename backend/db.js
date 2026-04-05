const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/jaadu";

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      autoIndex: true
    });
    // eslint-disable-next-line no-console
    console.log("MongoDB connected");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}

module.exports = { connectDB };

