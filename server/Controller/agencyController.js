const asyncHandler = require("express-async-handler");
const agencyReg = require("../Models/agency-RegModel");
const tour = require("../Models/tourModel");
// const agency = require("../Models/agencyModel");
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
        name: user.companyName,
        adminName: user.adminName,
        ntn: user.companyNTN,
        license: user.license,
        address: `${user.officeAddress}, ${user.city}, ${user.province}, Pakistan`,
        role: "agency",
      },
    },
    process.env.ACCESS_TOKEN_SECRET, // Signature
    { expiresIn: "50m" } // Expiry Duration
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
  if (req.user && req.user.role === "agency") {
    res.status(200).json({
      message: "Already Logged In Before",
      email: req.user.email,
      id: req.user.id,
      name: req.user.name,
      adminName: req.user.adminName,
      ntn: req.user.ntn,
      license: req.user.license,
      address: req.user.address,
      role: "agency",
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
        email: agency.companyEmail,
        id: agency._id,
        name: agency.companyName,
        adminName: agency.adminName,
        ntn: agency.companyNTN,
        license: agency.license,
        address: `${agency.officeAddress}, ${agency.city}, ${agency.province}, Pakistan`,
      });
  } else {
    res.status(404);
    throw new Error("Invalid Username or Password");
  }
});


//@desc Refresh Access Token Using Refresh Token
//@route Post /api/agencies/refresh-token
//@access private
const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const inRefreshToken = req.cookies?.refresh_token || req.body?.refreshToken;
    const user = await agencyReg.findById(req?.user.id);

    if (!user) {
      res.status(401);
      throw new Error("Invalid Refresh Token");
    }
    if (inRefreshToken !== user?.refreshToken) {
      res.status(401);
      throw new Error("Refresh Token Expired or Used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refToken } = await generateAccess_and_Refresh_Token(
      user._id
    );

    res
      .status(200)
      .cookie("access_token", accessToken, options)
      .cookie("refresh_token", refToken, options)
      .json({
        message: "Access Token Refreshed",
        accessToken,
        refreshToken: refToken,
      });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: err.message });
  }
});

//@desc Get Currently Logged In User
//@route Post /api/agencies/current-agency
//@access private
const getCurrentAgency = asyncHandler(async (req, res) => {
  if (req.user && req.user.role === "agency") {
    res
      .status(200)
      .json({ message: "Agency Logged In", status: res.statusCode });
    return;
  }
  res.status(401).json({ message: "Unauthorized Access" });
});

//@desc Get All Active Ads
//@route Post /api/agencies/current-agency/tours:id
//@access private

const getAllTours = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;

    console.log(userId.toString());
    if (userId !== req.user.id.toString()) {
      res.status(401);
      throw new Error("Unauthorized Access");
    }

    const agency = await agencyReg.findById(userId);

    if (!agency) {
      res.status(404);
      throw new Error("Agency Not Found");
    }

    const tours = await tour.find({ agencyId: userId });

    console.log(tours);

    res.status(200).json({
      message: "Success",
      tours,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
});

const publishTour = asyncHandler(async (req, res) => {
  const agencyId = req.params.id;
  console.log(agencyId);
  const {
    tourAgencyName,
    tourStartDate,
    tourEndDate,
    tourLocationName,
    tourLocationImage,
    tourRegistrationEndDate,
    tourInformation,
    tourStatus,
    tourPrice,

  } = req.body;

  

  console.log("REQ BODY", req.body);
  if (!tourStartDate) {
    console.log("REQ.BODY.STARTDATE: ", tourStartDate);
    res.status(400);
    throw new Error("Tour start date is mandatory");
  }

  if (!tourEndDate) {
    res.status(400);
    throw new Error("Tour end date is mandatory");
  }

  if (!tourAgencyName) {
    res.status(400);
    throw new Error("Tour agency name is mandatory");
  }

  if (!tourLocationName) {
    res.status(400);
    throw new Error("Tour location name is mandatory");
  }

  if (!tourLocationImage) {
    res.status(400);
    throw new Error("Tour location image is mandatory");
  }

  if (!tourRegistrationEndDate) {
    res.status(400);
    throw new Error("Tour registration end date is mandatory");
  }

  if (!tourInformation) {
    res.status(400);
    throw new Error("Tour information is mandatory");
  }

  if (!tourStatus) {
    res.status(400);
    throw new Error("Tour status is mandatory");
  }

  if (!tourPrice) {
    res.status(400);
    throw new Error("Tour Price is mandatory");
  }

  

  // Create the tour in the database
  const newTour = await tour.create({
    agencyId,
    tourAgencyName,
    tourStartDate,
    tourEndDate,
    tourLocationName,
    tourLocationImage,
    tourRegistrationEndDate,
    tourInformation,
    tourStatus,
    tourPrice,
  });


  console.log("DB NEW TOUR", newTour);

  res.status(200).json({
    message: "Tour created and published successfully",
    tour: newTour,
  });
});


module.exports = {
  registerAgency,
  loginAgency,
  refreshAccessToken,
  getCurrentAgency,
  getAllTours,
  publishTour,
};

