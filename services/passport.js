/**
 * Created by Ozgen on 9/9/16.
 */
const Passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const LocalStrategy = require('passport-local');

// create a local strategy

const localOptions = {'usernameField': 'email'};
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {

    User.findOne({email: email}, function (err, user) {

        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false);
        }

        //compare passwords

        user.comparePassword(password, function (err, isMatch) {
                    console.log(err)
            if (err) {
                return done(err);
            }

            if (!isMatch) {
                return done(null, false);
            }

            done(null, user);
        });
    });

});


const JwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(JwtOptions, function (payload, done) {

    User.findById(payload.sub, function (err, user) {

        if (err) return done(err, false);

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }

    })

});

Passport.use(jwtLogin);
Passport.use(localLogin);
