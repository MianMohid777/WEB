const express = require("express");

const router = express.Router();

const {
    allTour
} = require("../Controller/tourController");

router.route("/all-tours").get(allTour);

module.exports = router;