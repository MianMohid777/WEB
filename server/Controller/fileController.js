const fs = require("fs");
const path = require("path");

const getImage = (req, res) => {
  const dir = path.resolve(__dirname, "..");
  const staticPath = path.join("Static", req.params.filename);
  const imagePath = path.join(dir, staticPath);
  console.log(imagePath);

  const image = fs.readFileSync(imagePath);
  console.log(dir);
  res.send(image);
};

module.exports = { getImage };
