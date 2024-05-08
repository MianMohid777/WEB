const mongoose = require("mongoose");

const tourSchema = mongoose.Schema(
  {
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agencyReg",
    },
    agencyName: {
      type: String,
      required: [true, "Provide Company Name"],
    },
    locationName: {
      type: String,
      required: [true, "Provide Location Name"],
    },
    locationImage: {
      type: String,
      required: [true, "Provide Location Image URL"],
    },
    startDate: {
      type: Date,
      required: [true, "Provide Start Date"],
    },
    endDate: {
      type: Date,
      required: [true, "Provide End Date"],
    },
    registrationEndDate: {
      type: Date,
      required: [true, "Provide Registration End Date"],
    },
    information: {
      type: String,
      required: [true, "Provide Information"],
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ended", "Cancelled"],
      required: [true, "Provide Status"],
    },
    price: {
      type: String,
      required: [true, "Provide Price"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
