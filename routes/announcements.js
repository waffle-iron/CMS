/**
 * Created by sghaida on 5/13/2017.
 */

var express         = require('express'),
    router          = express.Router(),
    passport        = require('passport'),
    auth            = require('connect-ensure-login'),
    Announcement    = require('../models/announcement');


router.get('/',auth.ensureLoggedIn('/login'), function (req,res, next) {
    res.render('announcements/view');
});

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
            announcement.save();
        }
    });
})

router.get('/new', auth.ensureLoggedIn('/login'), function (req,res, next) {
    res.render('announcements/new');
});



module.exports = router;

