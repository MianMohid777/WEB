const express = require("express");

const router = express.Router();

const {
  loginAdmin,
  refreshAccessToken,
  currentAdmin,
} = require("../Controller/adminController");

const stayLoggedValidator = require("../Middleware/stayLoggedIn.validation");
const validateToken = require("../Middleware/validateToken");

router.route("/login").post(stayLoggedValidator, loginAdmin);

// Protected Routes //

//router.route("/refresh-token").post(refreshAccessToken);
//router.route("/current-Admin").get(validateToken, currentAdmin);

module.exports = router;
