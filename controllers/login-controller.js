const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

// rest logged in api
const login = (req, res) => {
    res.send('Logging In')
}

module.exports = login;