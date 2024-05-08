const asyncHandler = require("express-async-handler");
const agencyReg = require("../Models/agency-RegModel");
const tour = require("../Models/tourModel")
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




const publishTour = asyncHandler(async (req, res) => {
  const {

    tourStartDate,
    tourEndDate,
    tourAgencyName, 
    tourLocationName, 
    tourLocationImage,
    tourRegistrationEndDate,
    tourInformation, 
    tourStatus 
  } = req.body;

  console.log("REQ BODY", req.body);



  if (!req.body.tourStartDate) {
    console.log("REQ.BODY.STARTDATE: ", req.body.tourStartDate)
    res.status(400);
    throw new Error("Tour start date is mandatory");
  }
  
  if (!req.body.tourEndDate) {
    res.status(400);
    throw new Error("Tour end date is mandatory");
  }
  
  if (!req.body.tourAgencyName) {
    res.status(400);
    throw new Error("Tour agency name is mandatory");
  }
  
  if (!req.body.tourLocationName) {
    res.status(400);
    throw new Error("Tour location name is mandatory");
  }
  
  if (!req.body.tourLocationImage) {
    res.status(400);
    throw new Error("Tour location image is mandatory");
  }
  
  if (!req.body.tourRegistrationEndDate) {
    res.status(400);
    throw new Error("Tour registration end date is mandatory");
  }
  
  if (!req.body.tourInformation) {
    res.status(400);
    throw new Error("Tour information is mandatory");
  }
  
  if (!req.body.tourStatus) {
    res.status(400);
    throw new Error("Tour status is mandatory");
  }
  

  
  console.log("DB NEW TOUR",  new Date(req.body.tourStartDate));
  
  // Create the tour in the database
  const newTour = await tour.create({
    startDate: tourStartDate,
    endDate: new Date(req.body.tourStartDate),
    agencyName: tourAgencyName,
    locationName: tourLocationName,
    locationImage: tourLocationImage,
    registrationEndDate: new Date(req.body.tourStartDate),
    information: tourInformation,
    status: tourStatus
  });
  
  
  console.log("DB NEW TOUR", newTour);

  res.status(200).json({
    message: "Tour created and published successfully",
    tour: newTour,
  });
});






module.exports = { registerAgency, loginAgency, publishTour};
