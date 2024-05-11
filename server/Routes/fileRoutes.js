const express = require("express");

const router = express.Router();

const { getImage } = require("../Controller/fileController");

router.route("/:filename").get(getImage);

module.exports = router;
