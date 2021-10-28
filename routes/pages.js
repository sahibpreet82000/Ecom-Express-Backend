const express = require("express");
const router = express.Router();

// To get registration page

router.get("/", (req, res) => {
    res.render("pages/index");
  });


//Export

module.exports = router;