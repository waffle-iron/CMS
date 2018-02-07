/**
 * Created by sghaida on 5/12/2017.
 */

var express     = require('express'),
    passport    = require('passport'),
    User        = require('../models/user'),
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
                if(user === null) {
                    //add user
                    var newUser = new User({
                        employeeid: req.user.employeeID,
                        name: req.user.displayName,
                        mail: req.user.mail,
                        title: req.user.title,
                        department: req.user.department || 'N/A',
                        office: req.user.physicalDeliveryOfficeName || 'N/A',
                        country: req.user.country || 'N/A',
                        listOfApps: [],
                        role: {
                            id: ObjectId("592523ffb6680c365c61c3fc"),
                            roleName: 'user'
                        },
                        accountEnabled: true

                    })
                    newUser.save(function (err, user) {
                        if(err){
                            console.log(err);
                            res.redirect('/login');
                        } else {
                            req.session.passport.user._id  = user._id.toString();
                            req.session.passport.user.role = user.role;
                            req.flash('success', 'welcome to CCC Portal');
                            res.redirect(req.session.returnTo || '/');
                            delete req.session.returnTo;
                        }
                    })

                } else {
                    req.session.passport.user.role.id = user.role.id;
                    req.session.passport.user.role.roleName = user.role.roleName;
                    req.session.passport.user.role.listOfCountries = user.role.listOfCountries;
                    req.session.passport.user.role.listOfSites = user.role.listOfSites;
                    req.session.passport.user._id  = user._id.toString();
                    res.redirect(req.session.returnTo || '/');
                    delete req.session.returnTo;
                }
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