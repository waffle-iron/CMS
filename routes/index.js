var express         = require('express'),
    breadcrumbs     = require('express-breadcrumbs'),
    router          = express.Router(),
    passport        = require('passport'),
    async           = require('async'),
    auth            = require('connect-ensure-login'),
    Application     = require('../models/application'),
    Department      = require('../models/department'),
    Announcement    = require('../models/announcement')
    calendar        = require('../helpers/calendar');

/* GET home page. */
router.get('/', auth.ensureLoggedIn('/login'), function(req, res, next) {
    async.parallel([
        function (cb) {
            Announcement.find({'category': 'company', 'status': 'Approved', 'toBeRemoved': { $ne: true}},null,{sort : {creationDate: 'desc'}}).populate('department').limit(5).exec(cb);
        },
        function (cb) {
            Application.find({},cb)
        },
        function (cb) {
          calendar(req.user.office,cb);
        },
        function (cb) {
            Announcement.find({'category': 'public', 'status': 'Approved', 'toBeRemoved': { $ne: true}},null,{sort : {creationDate: 'desc'}}).populate('department').limit(5).exec(cb);
        }
    ], function (err, result) {
        if(err){
            console.log(err)
        } else {
            req.breadcrumbs();
            res.render('index', {announcementsCompany: result[0], applications: result[1], calendar: result[2], announcementsPublic: result[3], breadcrumbs: req.breadcrumbs()});
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
