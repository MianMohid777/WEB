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
    // Hardcoded date values
    tourStartDate: {
      type: Date,
      default: new Date("2024-06-01T00:00:00.000Z"), // Using ISO 8601 string
      required: [true, "Provide Start Date"],
    },
    tourEndDate: {
      type: Date,
      default: new Date(), // Using Date object (current date and time)
      required: [true, "Provide End Date"],
    },
    tourRegistrationEndDate: {
      type: Date,
      default: "2024-06-30T23:59:59.999Z", // Using ISO 8601 string
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
