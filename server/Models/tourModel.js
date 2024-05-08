const mongoose = require("mongoose");

const tourSchema = mongoose.Schema(
  {
    agencyName: {
      type: String,
      required: [true, "Provide Company Name"]
    },
    locationName: {
      type: String,
      required: [true, "Provide Location Name"],
    },
    locationImage: {
      type: String,
      required: [true, "Provide Location Image URL"],
    },
    tourStartDate: {
      type: String,
      required: [true,"Provide Start Date"],
    },
    tourEndDate: {
      type: String,
      required: [true, "Provide End Date"],
    },
    tourRegistrationEndDate: {
      type: String,
      required: [true, "Provide Registration End Date"],
    },
    information: {
      type: String,
      required: [true, "Provide Information"],
    },
    status: {
      type: String,
      enum: ['Upcoming', 'RegistrationsOpened'],
      required: [true, "Provide Status"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);

