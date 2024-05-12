const Tour = require("../Models/tourModel");
const asyncHandler = require("express-async-handler");

const allTours = asyncHandler(async (req, res) => {
  const allTours = await Tour.find();
  res.status(200).json({
    tours: allTours,
  });
});

module.exports = {
  allTours,
};
