const mongoose = require("mongoose");
const cfg = require("config");
const db = cfg.get("MONGO_URI");

// connection to mongoDb database
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true
    });
    console.log("[MongoDB] Connected to the database on port 27017");
  } catch (err) {
    // Error Handler
    console.error("[MongoDB Error]" + " " + err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
