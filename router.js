/**
 * Created by Ozgen on 9/8/16.
 */
const Authentication = require('./routerController/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});

const requireSignin = passport.authenticate('local', {session: false});

module.exports = function (app) {
    
    app.get('/', requireAuth, function (req, res) {

        res.send({message:'Mehmet ozgen'});
    })

    app.post('/signup', Authentication.signUp);
    app.post('/signin', requireSignin, Authentication.signin);
}