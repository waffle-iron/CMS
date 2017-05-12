/**
 * Created by sghaida on 5/12/2017.
 */

var express = require('express'),
    passport = require('passport'),
    router = express.Router();


router.get('/', function (req, res, next) {
    req.logout();
    req.flash('success', 'You have been logged out')
    res.redirect('/login');
});

module.exports = router;
