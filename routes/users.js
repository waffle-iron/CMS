var express   = require('express'),
    router    = express.Router(),
    mongo     = require('mongoose'),
    User      = require('../models/user')

/* GET users listing. */
router.get('/', auth.ensureLoggedIn('/login'), middleware.isSystemAdmin, function(req, res, next) {
  User.find({}).populate('roles').exec(function (users,err) {
     if(err){
       console.log(err);
     } else {
         res.render('users', {users: users});
     }
  });
});

module.exports = router;
