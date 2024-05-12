const Tour = require("../Models/tourModel");
const asyncHandler = require("express-async-handler");

const allTour = asyncHandler(async (req, res) => {
  const tours = await Tour.find();
  
  res.status(200).json({
    data: tours
  });
});

module.exports = {
    allTour
};