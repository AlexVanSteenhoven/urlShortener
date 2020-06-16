const express = require("express"); // require the express web framework
const app = express(); // Initialize App
const connectDB = require("./config/db"); // Import database connection

connectDB(); // Connect to the db
app.use(express.json({ extended: false })); // Let the server use json data

app.get("/", (req, res) => {
  // Index Route
  res.json({ msg: "Success" });
});

// Define routes
app.use("/", require("./routes/index"));
app.use("/url", require("./routes/url"));

const port = process.env.PORT || 3000; // Define a port
app.listen(port, () => {
  // Start the server on the defined port
  console.log(`[Server] running on http://localhost:${port}`);
});
