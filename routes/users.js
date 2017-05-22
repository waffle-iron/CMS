var express     = require('express'),
    router      = express.Router(),
    mongo       = require('mongoose'),
    auth        = require('connect-ensure-login'),
    middleware  = require('../middleware/authentication'),
    User        = require('../models/user')

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

module.exports = router;
