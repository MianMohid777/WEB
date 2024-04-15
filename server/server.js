const express = require("express");
const errorHandler = require("./Middleware/errorHandler");
const dotenv = require("dotenv").config();
const connectDb = require("./Config/DbConnection");

connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse the body from client

app.use("/api/tourists", require("./Routes/TouristRoutes"));

app.use(errorHandler);
app.listen(port, () => console.log(`Server Running on Port N.O ${port}`));
