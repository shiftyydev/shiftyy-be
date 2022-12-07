// is user logged in middleware express

const express = require('express');
const router = express.Router();
const pp = require('../config/ppConfig');

const middleware = (req, res, next) => {
    if (req.user) {

        // if user is logged in, continue
        pp.authenticate('local', {
            successRedirect: '/profile',
            failureRedirect: '/login'
        })(req, res, next);
    } else {
        // if user is not logged in, redirect to login page
        res.redirect('/login');
    }
}