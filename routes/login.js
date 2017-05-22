/**
 * Created by sghaida on 5/12/2017.
 */

var express     = require('express'),
    passport    = require('passport'),
    User        = require('../models/user')
    router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', passport.authenticate('ldapauth',{
        session: true,
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: true
    }), function(req, res) {
        console.log('you logged in as: ' + req.user.mail);
        User.findOne({employeeid: req.user.employeeID}).populate('roles').exec( function (err, user) {
            if(err){
                console.log(err);
            } else {
                var roles = [];

                user.roles.forEach(function (role) {
                    roles.push(role.name);
                });

                req.session.passport.user.roles = roles;
                req.session.passport.user._id  = user._id.toString();
                res.redirect(req.session.returnTo || '/');
                delete req.session.returnTo;
            }
        });
});

/*router.post('/', passport.authenticate('ldapauth', {
        session: true,
        successReturnToOrRedirect: '/',
        failureRedirect: '/login'
    })
);*/

module.exports = router;