const mongoose = require("mongoose");

const tourSchema = mongoose.Schema(
  {
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agencyReg",
    },
    tourAgencyName: {
      type: String,
      required: [true, "Provide Company Name"],
    },
    tourLocationName: {
      type: String,
      required: [true, "Provide Location Name"],
    },
    tourLocationImage: {
      type: String,
      required: [true, "Provide Location Image URL"],
    },

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
    tourInformation: {
      type: String,
      required: [true, "Provide Information"],
    },
    tourStatus: {
      type: String,
      enum: ['Upcoming', 'RegistrationsOpened'],

      required: [true, "Provide Status"],
    },
    tourPrice: {
      type: String,
      required: [true, "Provide Price"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
