/**
 * Created by sghaida on 5/13/2017.
 */

var express         = require('express'),
    router          = express.Router(),
    passport        = require('passport'),
    auth            = require('connect-ensure-login'),
    Announcement    = require('../models/announcement'),
    Department      = require('../models/department'),
    Tag             = require('../models/tag'),
    async           = require('async');


/* View all announcements  */
router.get('/',auth.ensureLoggedIn('/login'), function (req,res, next) {
    Announcement.find().populate('departments').populate('tags').exec(function (err, announcements) {
        if(err){
            console.log(err);
        }else {
            res.render('announcements/view', {announcements: announcements});
        }
    });

});

/* Submits new announcement */
router.post('/', auth.ensureLoggedIn('/login'), function (req, res, next) {
    Announcement.create(req.body.announcement, function (err, announcement) {
        if(err){
            console.log(err);
        } else {
            announcement.author.id = req.user._id;
            announcement.author.name = req.user.name;
            req.body.announcement.tags.forEach(function(tag){
                announcement.tags.push(tag);
            });
            announcement.department = req.body.announcement.department
            announcement.save();

            if(req.body['new-announcement'] === 'on') {
                res.redirect('/announcements/new')
            } else {
                res.redirect('/announcements');
            }

        }
    });
})

/* shows the new announcement form */
router.get('/new', auth.ensureLoggedIn('/login'), function (req,res, next) {
   async.parallel([
           function (cb) {
               Tag.find({},cb);
           },
           function (cb) {
               Department.find({},cb);
           }
       ],function (err, result) {
            if(err) {
                console.log('fuckin error' + err)
            }else {
                console.log(result);
                console.log('fuck');
                res.render('announcements/new', {tags: result[0], departments: result[1]});
            }
   });

});



module.exports = router;

