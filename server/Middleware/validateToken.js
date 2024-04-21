const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { loginTourist } = require("../Controller/touristController");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization;

  token = req.cookies?.accessToken; //Get from Cookies

  if (!token && authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("User is not Authorized or Token is missing");
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not Authorized || Invalid Access Token");
      }

      req.user = decoded.user;
      next();
    });
  } catch (err) {
    res.status(401);
    throw new Error("User is not Authorized || Invalid Access Token");
  }
});
module.exports = validateToken;
