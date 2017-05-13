/**
 * Created by sghaida on 5/12/2017.
 */

var express     = require('express'),
    passport    = require('passport'),
    User        = require('../models/user')
    router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', passport.authenticate('ldapauth', {
        session: true,
        successReturnToOrRedirect: '/',
        failureRedirect: '/login',
    })
);

module.exports = router;