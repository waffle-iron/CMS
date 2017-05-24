/**
 * Created by sghaida on 5/23/2017.
 */

var express         = require('express'),
    breadcrumbs     = require('express-breadcrumbs'),
    router          = express.Router(),
    middleware      = require('../middleware/authentication'),
    passport        = require('passport'),
    auth            = require('connect-ensure-login'),
    Application     = require('../models/application'),
    async           = require('async');


/* GET list all applications*/
router.get('/', auth.ensureLoggedIn('/login'), function (req,res,next) {
    Application.find({}).populate('owner author').exec(function (err, apps) {
       if(err){
           console.log(err);
       } else {
           req.breadcrumbs([{name: 'Applications', url: '/applications'}]);
           res.render('applications/view', {applications: apps, breadcrumbs: req.breadcrumbs()});
        }
    });
});

/* POST add new application*/
router.post('/', auth.ensureLoggedIn('/login'), middleware.isSystemAdmin, function (req, res, next) {
    Application.create(req.body.application, function (err, application) {
        if(err){
            console.log(err);
        } else {
            application.author = req.user._id;
            application.tags =req.body.application.tags;
            application.owner = req.body.application.department;
            application.save();

            if(req.body['new-application'] === 'on') {
                res.redirect('/applications/new')
            } else {
                res.redirect('/applications');
            }
        }
    });
});


router.get('/find/:name', auth.ensureLoggedIn('/login'),  function (req,res, next) {
   var query = req.params.name;
    Application.find({}).and([
       { $or: [{name: new RegExp(query, 'i')}, {description: new RegExp(query, 'i')}] }
   ]).populate('author owner').exec(function (err, apps) {
        if(err){
            console.log(err)
        }else {
            res.send(apps);
        }
    })
});

router.get('/filter/:name', auth.ensureLoggedIn('/login'), function (req,res, next) {
    var query = req.params.name;
    Application.find({}).and([
        { $or: [{name: new RegExp(query, 'i')}, {description: new RegExp(query, 'i')}] }
    ]).populate('author owner').exec(function (err, apps) {
        if(err){
            console.log(err)
        }else {
            req.breadcrumbs([{name: 'Applications', url: '/applications'}]);
            res.render('applications/view', {applications: apps, breadcrumbs: req.breadcrumbs()});
        }
    })
});
module.exports = router;
