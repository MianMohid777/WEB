const fs = require("fs");
const path = require("path");

const getImage = (req, res) => {
  const dir = path.resolve(__dirname, "..");
  const staticPath = path.join("Static", req.params.filename);
  const imagePath = path.join(dir, staticPath);
  console.log(imagePath);

  const image = fs.readFileSync(imagePath);
  //console.log(dir);
  res.send(image);
};

const uploadImage = (req, res) => {
  console.log(req.body);
  console.log(req.file);
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  res.status(200).json({
    message: "Image Uploaded Successfully",
    filePath: req.file.path,
  });
};

module.exports = { getImage, uploadImage };
