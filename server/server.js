const express = require("express");
const errorHandler = require("./Middleware/errorHandler");
const dotenv = require("dotenv").config();
const connectDb = require("./Config/dbConnection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const touristRoutes = require("./Routes/touristRoutes");
const agencyRoutes = require("./Routes/agencyRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const oauthRoutes = require("./Routes/oauthRoutes");
const fileRoutes = require("./Routes/fileRoutes");
const multer = require("multer");

connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json({limit: '50mb'})); // Middleware to parse the body from client

app.use("/api/tourists", touristRoutes);
app.use("/api/agencies", agencyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", oauthRoutes);

app.use("/api/static", fileRoutes);

app.use(errorHandler);
app.listen(port, () => console.log(`Server Running on Port N.O ${port} \n`));
