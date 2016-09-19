/**
 * Created by Ozgen on 9/8/16.
 */
const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');


function tokenForUser(user) {

    const timestamp = new Date().getTime();

    return jwt.encode({sub: user._id, iat: timestamp}, config.secret);

}

function parseToken(token) {
    return jwt.decode(token, config.secret);
}
exports.signUp = function (req, res, next) {

    const user = {};
    user.email = req.body.email;
    user.password = req.body.password;

    if (!user.email || !user.password) return res.status(422).send('Invalid data');

    User.findOne({email: user.email}, function (err, existingUser) {

        if (err) {
            return next(err);
        }

        if (existingUser) {
            return res.status(422).send({error: 'email is in use'});
        }

        const userToSave = new User({
            email: user.email,
            password: user.password
        });

        userToSave.save(function (err) {

            if (err) return next(err);

            res.json({token: tokenForUser(userToSave)});
        })
    })
};

exports.signin = function (req, res, next) {
    const token = tokenForUser(req.user);
    console.log(parseToken(token).sub);

    res.send({token: token});

}

