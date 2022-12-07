// passport config for rest api

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');
const bcrypt = require('bcrypt');

// passport config for rest api
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    db.user.findOne({
        where: { email: email }
    }).then(user => {
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Invalid email or password' });
        } else {
            return done(null, user);
        }
    }).catch(done);
}));

passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'process.env.JWT_SECRET'
}, (payload, done) => {
    db.user.findByPk(payload.id).then(user => {
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    }).catch(done);
}));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
})

passport.deserializeUser((id, cb) => {
    db.user.findByPk(id).then(user => {
        cb(null, user);
    }).catch(cb);
})

module.exports = passport;

