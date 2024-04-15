const express = require("express");

const router = express.Router();

const { loginTourist } = require("../Controller/TouristController");

router.route("/login").post(loginTourist);

module.exports = router;
