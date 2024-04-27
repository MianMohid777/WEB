const asyncHandler = require("express-async-handler");
const agencyReg = require("../Models/agency-RegModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccess_and_Refresh_Token = async (userId) => {
  const user = await agencyReg.findById({ _id: userId });

  const accessToken = jwt.sign(
    {
      //Payload //
      user: {
        email: user.companyEmail,
        id: user._id,
        name: user.compnayName,
      },
    },
    process.env.ACCESS_TOKEN_SECRET, // Signature
    { expiresIn: "5m" } // Expiry Duration
  );

  const refToken = jwt.sign(
    {
      //Payload //
      user: {
        email: user.companyEmail,
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

//@desc Register a Agency as User using Applicaton Details
//@route Post /api/agencies
//@access public
const registerAgency = asyncHandler(async (req, res) => {
  const {
    adminName,
    companyName,
    adminCNIC,
    companyEmail,
    companyNTN,
    password,
    license,
    city,
    province,
    officeAddress,
    contactNo,
  } = req.body;

  console.log(req.body);
  if (
    !adminName ||
    !companyName ||
    !companyEmail ||
    !companyNTN ||
    !password ||
    !license ||
    !adminCNIC ||
    !companyEmail ||
    !companyNTN ||
    !city ||
    !officeAddress ||
    !contactNo ||
    !province
  ) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }

  const exUser = await agencyReg.findOne({
    $or: [{ companyEmail }, { companyName }, { adminCNIC }, { companyNTN }],
  });

  if (exUser) {
    res.status(400);
    throw new Error("Agency Already Exists with these details");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const agency = await agencyReg.create({
    adminName,
    companyName,
    adminCNIC,
    companyEmail,
    password: hashPassword,
    companyNTN,
    contactNo,
    officeAddress,
    city,
    province,
    license,
  });

  res.status(201).json({
    message: "Agency Registered Successfully",
    agency,
  });
});

//@desc Login an Agency Using the Company Email and Password
//@route Post /api/agencies
//@access public

const loginAgency = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "Already Logged In Before",
      email: req.user.email,
      id: req.user.id,
      name: req.user.name,
    });
    return;
  }
  const { companyEmail, password } = req.body;

  if (!companyEmail || !password) {
    res.status(400);
    throw new Error("All Fields are Mandatory");
  }

  const agency = await agencyReg.findOne({ companyEmail });

  if (!agency) {
    res.status(404);
    throw new Error("Invalid Email-Address or Password");
  }
  if (agency?.status === false) {
    res.status(400);
    throw new Error("Agency is not Active");
  }

  console.log(agency);

  const options = {
    // Security options for making cookie data immutable
    httpOnly: true,
    secure: true,
  };

  if (agency && (await bcrypt.compare(password, agency.password))) {
    const { accessToken, refToken } = await generateAccess_and_Refresh_Token(
      agency._id
    );
    res
      .status(200)
      .cookie("access_token", accessToken, options)
      .cookie("refresh_token", refToken)
      .json({
        message: "Success",
        accessToken: accessToken,
        refreshToken: refToken,
        id: agency._id,
        name: agency.companyName,
      });
  } else {
    res.status(404);
    throw new Error("Invalid Username or Password");
  }
});
module.exports = { registerAgency, loginAgency };
