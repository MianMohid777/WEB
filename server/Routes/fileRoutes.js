const express = require("express");

const router = express.Router();

const { getImage, uploadImage } = require("../Controller/fileController");
const { upload } = require("../Middleware/multer.middleware");

router.route("/:filename").get(getImage);
router.route("/upload").post(upload.single("file"), uploadImage);

module.exports = router;
