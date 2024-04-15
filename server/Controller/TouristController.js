const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Get Tourist Email Address and Password for Verification
//@route Post /api/tourists
//@access public

const loginTourist = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All Fields are Mandatory");
  }
  const user = await User.findOne({
    emailAddress: email,
  });
  if (!user) {
    res.status(404);
    throw new Error("Invalid Email-Address or Password");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        //Payload //
        user: {
          email: emailAddress,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET, // Signature
      { expiresIn: "15m" } // Expiry Duration
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(404);
    throw new Error("Invalid Username or Password");
  }
});

module.exports = { loginTourist };
