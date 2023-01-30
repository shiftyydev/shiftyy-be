// is user logged in middleware express
const bcrypt = require("bcrypt");
const log = require("../utils/logger");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pp = require("../config/ppConfig");
const blacklist = new Set();
require("dotenv");
const isLoggedIn = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token || token == "undefined" || blacklist.has(token)) {
    res.status(401).json("Unauthorize user");
    return 0;
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        res.status(403).send(err.message);
      } else if (!decoded) {
        res.status(403).send("Unauthorized user");
      } else {
        req.user = decoded.dataValues;
        next();
      }
    });
  } catch (error) {
    log.info(error);
    res.status(500).json("Something went wronge");
  }
};

const hashPassword = async (password, saltRounds = 10, next) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);
    // Hash password
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }
  // Return null if error
  return null;
};
module.exports = {
  isLoggedIn,
  hashPassword,
  blacklist,
};
