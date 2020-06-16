const express = require("express"); // require the express web framework
const router = express.Router(); // Initialize App

const Url = require("../models/Url"); // Bringing the Url Schema

/*
  @Route GET /:code
  @Desc Redirect to the original URL
*/

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: "No URL found" });
    }
  } catch (err) {
    console.error("[Server Error]" + " " + err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
