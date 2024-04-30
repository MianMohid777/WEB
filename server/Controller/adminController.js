const asyncHandler = require("express-async-handler");
const admin = require("../Models/admin-model");
const agencyReg = require("../Models/agency-RegModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");

// ACCESS TOKEN GENERATOR
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
      .cookie("refresh_token", refToken, options)
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

//@desc Current Admin
//@route /admin/current-admin
//@access private

const currentAdmin = asyncHandler(async (req, res) => {
  if (req.user) {
    res
      .status(200)
      .json({ message: "Admin Logged In", status: res.statusCode });
  }
});

//@desc Get All Non Active Applicants
//@route /admin/current-admin
//@access private

const getAllApplications = asyncHandler(async (req, res) => {
  const applications = await agencyReg.find({ status: "false" });
  try {
    if (applications.length > 0) {
      res.status(200).json(applications);
    } else {
      res.status(200).json({ message: "No applications found" });
    }
  } catch (err) {
    console.log(err);
    res.status(404);
    throw new Error("API Error");
  }
});

//@desc Update the status of the application to True
//@route /admin/current-admin/applications/approve:id
//@access private

const approveApplication = asyncHandler(async (req, res) => {
  try {
    const application = await agencyReg.findOneAndUpdate(
      { _id: req.params.id },
      { status: true },
      { new: true }
    );

    if (!application) {
      res.status(404);
      throw new Error("Application Not Found");
    }

    res.status(200).json({ message: "success", application });
  } catch (err) {
    console.log(err);
    res.status(404);
    throw new Error("Application Not Found");
  }
});

//@desc Log Out the Admin
//@route /admin/current-admin/logout
//@access private

const logOut = asyncHandler(async (req, res) => {
  if (req.user) req.user = {};
  res
    .status(200)
    .clearCookie("access_token")
    .clearCookie("refresh_token")
    .json({ message: "Logged Out" });
});
module.exports = {
  loginAdmin,
  currentAdmin,
  getAllApplications,
  approveApplication,
  logOut,
};
