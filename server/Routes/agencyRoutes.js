const express = require("express");

const router = express.Router();

const {
  loginAgency,
  registerAgency,
  refreshAccessToken,
  getCurrentAgency,
  getAllTours,
  publishTour,
  getSearchedTour,
  getPastTours,
  updateTours_ActiveComplete,
} = require("../Controller/agencyController");

const stayLoggedValidator = require("../Middleware/stayLoggedIn.validation");
const validateToken = require("../Middleware/validateToken");

router.route("/login").post(stayLoggedValidator, loginAgency);
router.route("/register").post(registerAgency);

// Protected Routes //

router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-agency").get(validateToken, getCurrentAgency);
router
  .route("/current-agency/tours/:id")
  .get(validateToken, getAllTours)
  .put(validateToken, updateTours_ActiveComplete);

// router
//   .route("/current-agency/tours/search/:value")
//   .get(validateToken, getSearchedTour);

router
  .route("/current-agency/publish-tour/:id")
  .post(validateToken, publishTour);

// router
//   .route("/current-agency/tours/history/:id")
//   .post(validateToken, getPastTours);
module.exports = router;
