/**
 * Created by sghaida on 5/13/2017.
 */

var express         = require('express'),
    router          = express.Router(),
    passport        = require('passport'),
    auth            = require('connect-ensure-login'),
    Announcement    = require('../models/announcement');


router.get('/',auth.ensureLoggedIn('/login'), function (req,res, next) {
    res.render('announcements');
});

module.exports = router;

