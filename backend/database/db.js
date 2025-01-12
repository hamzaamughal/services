const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      socketTimeoutMS: 45000, // increase socket timeout to 45 seconds
      serverSelectionTimeoutMS: 5000, // increase server selection timeout
    });
    console.log("mongodb connected successfully 📑📁");
  } catch (error) {
    console.log("mongodb connection failed");
    process.exit(1);
  }
};

module.exports = connectDB;
