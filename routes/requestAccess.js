/**
 * Created by sghaida on 5/24/2017.
 */

var express         = require('express'),
    breadcrumbs     = require('express-breadcrumbs'),
    router          = express.Router(),
    middleware      = require('../middleware/authentication'),
    passport        = require('passport'),
    auth            = require('connect-ensure-login'),
    Application     = require('../models/application'),
    async           = require('async');


router.get('/', auth.ensureLoggedIn('/login'), function (req, res, next) {
    Application.find({requirePermission: true}).populate('owner author').exec(function (err, apps) {
        if(err){
            console.log(err);
        } else {
            req.breadcrumbs([{name: 'Applications', url: '/applications'}]);
            res.render('requests/app',{applications: apps, breadcrumbs: req.breadcrumbs()});
        }
    });
});

module.exports = router;
