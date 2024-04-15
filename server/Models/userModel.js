const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    emailAddress: {
      type: String,
      required: [true, "Provide email"],
      unique: [true, "Already Taken"],
    },
    password: {
      type: String,
      required: [true, "Provide Password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
