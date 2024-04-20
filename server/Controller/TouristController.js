const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Get Tourist Email Address and Password for Verification
//@route Post /api/tourists
//@access public

const generateAccess_and_Refresh_Token = async (userId) => {
  const user = await User.findById({ _id: userId });

  const accessToken = jwt.sign(
    {
      //Payload //
      user: {
        email: user.emailAddress,
        id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET, // Signature
    { expiresIn: "15m" } // Expiry Duration
  );

  const refToken = jwt.sign(
    {
      //Payload //
      user: {
        email: user.emailAddress,
        id: user._id,
      },
    },
    process.env.REFRESH_TOKEN_SECRET, // Signature
    { expiresIn: "2d" } // Expiry Duration
  );

  user.refreshToken = refToken;

  await user.save({ validateBefore: false });

  return { accessToken, refToken };
};
const loginTourist = asyncHandler(async (req, res) => {
  const { emailAddress, password } = req.body;

  if (!emailAddress || !password) {
    res.status(400);
    throw new Error("All Fields are Mandatory");
  }

  const user = await User.findOne({ emailAddress });
  if (!user) {
    res.status(404);
    throw new Error("Invalid Email-Address or Password");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const { accessToken, refToken } = await generateAccess_and_Refresh_Token(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      // Security options for making cookie data immutable
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refToken", refToken, options)
      .json({ message: "Success", accessToken, refreshToken: refToken });
  } else {
    res.status(404);
    throw new Error("Invalid Username or Password");
  }
});

const registerTourist = asyncHandler(async (req, res) => {
  const { firstName, lastName, emailAddress, password } = req.body;

  if (!firstName || !lastName || !emailAddress || !password) {
    res.status(400);
    throw new Error("All Fields are Mandatory");
  }

  const exUser = await User.findOne({ emailAddress });

  if (exUser) {
    res.status(400);
    throw new Error("Email Address Already Taken");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    emailAddress,
    password: hashPassword,
  });

  res.status(201).json({ message: "User created successfully", id: user._id });
});

module.exports = { loginTourist, registerTourist };
