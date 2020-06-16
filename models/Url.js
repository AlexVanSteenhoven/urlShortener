// Import Mongoose
const mongoose = require("mongoose");

// Create URL schema
const urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  date: { type: String, default: Date.now }
});

// Export URL model
module.exports = mongoose.model("url", urlSchema);
