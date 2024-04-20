const express = require("express");
const errorHandler = require("./Middleware/errorHandler");
const dotenv = require("dotenv").config();
const connectDb = require("./Config/dbConnection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const touristRoutes = require("./Routes/touristRoutes");

connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json()); // Middleware to parse the body from client
app.use(cookieParser());

app.use("/api/tourists", touristRoutes);

app.use(errorHandler);
app.listen(port, () => console.log(`Server Running on Port N.O ${port} \n`));
