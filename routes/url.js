const express = require("express"); // require the express web framework
const router = express.Router(); // Initialize App

// Import modules
const validUrl = require("valid-url");
const shortId = require("shortid");
const cfg = require("config");

const Url = require("../models/Url");

// @route POST /url/shorten
// @desc Create short URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = cfg.get("BASE_URL");

  // Check Base Url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json({ error: "Base url is invalid!" });
  }

  // Create url code
  const urlCode = shortId.generate();

  // Check longUrl
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.error("[Server Error]" + " " + err.message);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(401).json({ error: "Invalid Long Url" });
  }
});

module.exports = router;
