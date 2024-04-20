const express = require("express");

const router = express.Router();

const {
  loginTourist,
  registerTourist,
} = require("../Controller/touristController");

router.route("/login").post(loginTourist);
router.route("/register").post(registerTourist);

module.exports = router;
