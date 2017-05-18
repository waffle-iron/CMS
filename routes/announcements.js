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
    Announcement.find().populate('department tags').exec(function (err, announcements) {
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
            announcement.tags =req.body.announcement.tags

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

/* show a single announcement*/
router.get('/:id', auth.ensureLoggedIn('/login'),function (req, res, next) {
    Announcement.find({_id: req.params.id}).populate('department tags').exec(function (err, announcement) {
        if(err){
            res.redirect('/announcements');
        } else {
            if(announcement.length > 0){
                res.render('announcements/view', {announcements: announcement});
            } else {
                res.redirect('/announcements');
            }
        }
    });
});

/* show edit form*/
router.get('/:id/edit', auth.ensureLoggedIn('/login'), function (req, res, next) {
    async.parallel([
        function (cb) {
            Tag.find({},cb);
        },
        function (cb) {
            Department.find({},cb);
        },
        function (cb) {
            Announcement.findById(req.params.id).populate('department').exec(cb);
        }
    ],function (err, result) {
        if(err) {
            console.log('fuckin error' + err)
        }else {
            console.log(result);
            if(result[2] === null){
                res.redirect('/announcements');
            } else {
                res.render('announcements/edit', {tags: result[0], departments: result[1], announcement: result[2]});
            }

        }
    });
});

/* update announcement */
router.put('/:id', auth.ensureLoggedIn('/login'), function (req, res, next) {
    Announcement.findByIdAndUpdate(req.params.id, req.body.announcement, function (err, toBeUpdated) {
        if(err){
            res.redirect('/announcements');
        } else {
            res.redirect('/announcements');
        }
    });
});

/* get by tag refrence*/
router.get('/tag/:id', auth.ensureLoggedIn('/login'), function (req, res, next) {
   Announcement.find({'tags': Object(req.params.id)}).populate('department tags').exec(function (err, announcements) {
       if(err){
           console.log(err);
       }else {
           res.render('announcements/view', {announcements: announcements});
       }
   });
});

/* get by department refrence*/
router.get('/department/:id', auth.ensureLoggedIn('/login'), function (req, res, next) {
    Announcement.find({'department': Object(req.params.id)}).populate('department tags').exec(function (err, announcements) {
        if(err){
            console.log(err);
        }else {
            res.render('announcements/view', {announcements: announcements});
        }
    });
});

module.exports = router;

