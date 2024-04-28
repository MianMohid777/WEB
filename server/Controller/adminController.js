const asyncHandler = require("express-async-handler");
const admin = require("../Models/admin-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccess_and_Refresh_Token = async (userId) => {
  const user = await admin.findById({ _id: userId });

  const accessToken = jwt.sign(
    {
      //Payload //
      user: {
        email: user.email,
        id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET, // Signature
    { expiresIn: "5m" } // Expiry Duration
  );

  const refToken = jwt.sign(
    {
      //Payload //
      user: {
        email: user.email,
        id: user._id,
      },
    },
    process.env.REFRESH_TOKEN_SECRET, // Signature
    { expiresIn: "1d" } // Expiry Duration
  );

  user.refreshToken = refToken;

  await user.save({ validateBefore: false });

  return { accessToken, refToken };
};

//@desc admin login & password
//@route /admin/login
//@access public

const loginAdmin = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "Already Logged In Before",
      email: req.user.email,
      id: req.user.id,
    });
    return;
  }
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All Fields are Mandatory");
  }

  const adminUser = await admin.findOne({ email });

  if (!adminUser) {
    res.status(404);
    throw new Error("Invalid Email-Address or Password");
  }

  const options = {
    // Security options for making cookie data immutable
    httpOnly: true,
    secure: true,
  };

  if (adminUser && password === adminUser.password) {
    const { accessToken, refToken } = await generateAccess_and_Refresh_Token(
      adminUser._id
    );
    res
      .status(200)
      .cookie("access_token", accessToken, options)
      .cookie("refresh_token", refToken)
      .json({
        message: "Success",
        accessToken: accessToken,
        refreshToken: refToken,
      });
  } else {
    res.status(404);
    throw new Error("Invalid Username or Password");
  }
});
module.exports = { loginAdmin };
