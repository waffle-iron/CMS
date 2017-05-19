var express     = require('express'),
    router      = express.Router(),
    passport    = require('passport'),
    auth        = require('connect-ensure-login'),
    Application = require('../models/application');

/* GET home page. */
router.get('/', auth.ensureLoggedIn('/login'), function(req, res, next) {
    Application.find({}, function (err, apps) {
       if(err){
           console.log(err);
       } else {
           res.render('index', {applications: apps});
       }
    });

});

router.get('/test',auth.ensureLoggedIn('/login'), function(req, res, next) {
    console.log(req.currentUser);
    res.render('test');
});

router.post('/test', function (req, res, next) {
    console.log('tags is : ' + req.body.tags);

});

module.exports = router;
