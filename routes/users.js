var util        = require('util'),
    express     = require('express'),
    breadcrumbs = require('express-breadcrumbs'),
    router      = express.Router(),
    mongo       = require('mongoose'),
    auth        = require('connect-ensure-login'),
    middleware  = require('../middleware/authentication'),
    User        = require('../models/user'),
    Role        = require('../models/role'),
    ldap        = require('activedirectory'),
    async       = require('async');

var config = {
        url: 'ldap://10.1.0.230:3268',
        baseDN: 'dc=ccg,dc=local',
        username: 'CN=LDAPU,DC=gr,DC=ccg,DC=local',
        password: 'Admin1Admin2@',
        attributes: {
            user : [
                'employeeID',
                'displayName',
                'givenName',
                'sAMAccountName',
                'mail',
                'title',
                'physicalDeliveryOfficeName',
                'co',
                'department'
        ]}
    },
    ad = new ldap(config);


/* GET users listing. */
router.get('/', auth.ensureLoggedIn('/login'), middleware.isSystemAdmin, function(req, res, next) {
  User.find({}).populate('roles').exec(function (err, users) {
     if(err){
       console.log(err);
     } else {
         req.breadcrumbs('Users');
         res.render('users/view', {users: users, breadcrumbs: req.breadcrumbs()});
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
    async.parallel([
        function (cb) {
            Role.find({},cb);
        },
        function (cb) {
            User.findById(req.params.id).populate('roles').exec(cb)
            }
        ],function (err, result) {
        if (err) {
            console.log(err);
        } else {
            req.breadcrumbs([{name: 'Users', url: '/users'}, {name: 'Edit', url: 'edit'}]);
            res.render('users/edit', {roles: result[0], users: result[1], breadcrumbs: req.breadcrumbs()});
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
            req.breadcrumbs([{name: 'Users', url: '/users'}, {name: 'New', url: 'new'}]);
            res.render('users/new', {roles: result[0], breadcrumbs: req.breadcrumbs()});
        }
    });
});


router.get('/find/:name', auth.ensureLoggedIn('/login'), middleware.isSystemAdmin, function (req, res, next) {
    var username = req.params.name;
    var query = util.format(
        '(&(|(objectClass=user)(objectClass=person))(!(objectClass=computer))(!(objectClass=group))(|(sAMAccountName=%s*)(mail=%s*)(cn=%s*)))',
        username,username,username
    );

    ad.findUsers(query, function (err, users) {
        if(err) { return err; }

        res.send(users);
    });

});
module.exports = router;
