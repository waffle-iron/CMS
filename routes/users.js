var express     = require('express'),
    router      = express.Router(),
    mongo       = require('mongoose'),
    auth        = require('connect-ensure-login'),
    middleware  = require('../middleware/authentication'),
    User        = require('../models/user'),
    Role        = require('../models/role'),
    async       = require('async');

/* GET users listing. */
router.get('/', auth.ensureLoggedIn('/login'), middleware.isSystemAdmin, function(req, res, next) {
  User.find({}).populate('roles').exec(function (err, users) {
     if(err){
       console.log(err);
     } else {
         res.render('users/view', {users: users});
     }
  });
});

/* POST new user*/
router.post('/', auth.ensureLoggedIn('/login'), middleware.isSystemAdmin, function (req, res, next) {
    User.create(req.body.user, function (err, user) {
        if(err){
            console.log(err);
        } else {
            User.save();

            if(req.body['new-user'] === 'on') {
                res.redirect('/users/new')
            } else {
                res.redirect('/users');
            }
        }
    });
});

/* GET edit user form */
router.get('/:id/edit', auth.ensureLoggedIn('/login'), middleware.isSystemAdmin, function (req, res, next) {
   User.findById(req.params.id).populate('roles').exec(function (err, user) {
       if(err) {
           console.log(err);
       } else {
           res.render('users/edit');
       }
   });
});

/* PUT update user info */
router.put('/:id',auth.ensureLoggedIn('/login'), middleware.isSystemAdmin, function (req,res,next) {
    User.findByIdAndUpdate(req.params.id, req.body.user, function (err, toBeUpdated) {
        if(err){
            res.redirect('/users');
        } else {
            res.redirect('/users');
        }
    });
});

/* GET new user form*/
router.get('/new', auth.ensureLoggedIn('/login'), middleware.isSystemAdmin, function (req, res, next) {
    async.parallel([
        function (cb) {
            Role.find({},cb);
        }
    ],function (err, result) {
        if(err) {
            console.log(err)
        }else {
            console.log(result);
            res.render('announcements/new', {roles: result[0]});
        }
    });
});

module.exports = router;
