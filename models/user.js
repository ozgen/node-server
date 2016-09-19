/**
 * Created by Ozgen on 9/8/16.
 */
const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
const bycrpt = require('bcrypt-nodejs');

const userScheme = new Scheme({

    email: {type: String, unique: true, lowercase: true},
    password: String
});

userScheme.pre('save', function (next) {

    const user = this;

    bycrpt.genSalt(10, function (err, salt) {

        if (err) return next(err);

        bycrpt.hash(user.password, salt, null, function (err, hash) {

            if (err) return next(err);

            user.password = hash;

            next();

        })

    })
});

userScheme.methods.comparePassword = function (candidatePass, callback) {

    bycrpt.compare(candidatePass, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }


        callback(null, isMatch);

    })

}

const user = mongoose.model('user', userScheme);

module.exports = user;

