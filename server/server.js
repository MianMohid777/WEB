const express = require("express");
const dotenv = require("dotenv").config();

const os = require("os");

const app = express();

console.log(os.arch());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running on Port N.O ${port}`));
