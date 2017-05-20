var express         = require('express'),
    router          = express.Router(),
    passport        = require('passport'),
    async           = require('async'),
    auth            = require('connect-ensure-login'),
    Application     = require('../models/application'),
    Department      = require('../models/department'),
    Announcement    = require('../models/announcement');

/* GET home page. */
router.get('/', auth.ensureLoggedIn('/login'), function(req, res, next) {
    async.parallel([
        function (cb) {
            Announcement.find({},null,{sort : {creationDate: 'desc'}}).limit(5).exec(cb);
        },
        function (cb) {
            Application.find({},cb)
        },
        function (cb) {
            Department.find({},cb)
        }
    ], function (err, result) {
        if(err){
            console.log(err)
        } else {
            res.render('index', {announcements: result[0], applications: result[1], departments: result[2]});
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
