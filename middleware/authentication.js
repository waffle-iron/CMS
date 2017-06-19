/**
 * Created by sghaida on 5/12/2017.
 */

var ldap    = require('activedirectory'),
    util    = require('util');
var config = {
    url: 'ldap://10.1.0.230:3268',
    baseDN: 'dc=ccg,dc=local',
    username: 'CN=LDAPU,DC=gr,DC=ccg,DC=local',
    password: 'Admin1Admin2@'
    },
    ad = new ldap(config);

exports.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error','Please login first')
        res.redirect('/login');
    }
};

exports.validateRole = function (roleName) {
    return function(req, res, next) {
        if (Object.keys(req.user.role).length !== 0 && req.user.role.roleName == roleName){
            return next();
        } else {
            req.flash('error', 'you dont have permission');
            res.redirect('back');
        }
    }
};

exports.isSystemAdmin = function (req, res, next) {
    if (Object.keys(req.user.role).length !== 0 && req.user.role.roleName == 'system-admin'){
        return next();
    } else {
        req.flash('error', 'you dont have permission');
        res.redirect('back');
    }
};

exports.isCountryAdmin = function (req, res, next) {
    if (Object.keys(req.user.role).length !== 0 && req.user.role.roleName == 'country-admin'){
        return next();
    } else {
        req.flash('error', 'you dont have permission');
        res.redirect('back');
    }
};

exports.isSiteAdmin = function (req, res, next) {
    //Object.keys(currentUser).length !== 0 &&  currentUser.role.roleName == 'system-admin'
    if (Object.keys(req.user.role).length !== 0 && req.user.role.roleName == 'site-admin'){
        return next();
    } else {
        req.flash('error', 'you dont have permission');
        res.redirect('back');
    }
};

exports.findUser = function (username) {
    var query = util.format(
        '(&(|(objectClass=user)(objectClass=person))(!(objectClass=computer))(!(objectClass=group))(|(sAMAccountName=%s*)(mail=%s*)(cn=%s*)))',
        username,username,username
    );

    ad.findUsers(query, function (err, users) {
        if(err) {
            return err;
        }
        return users;
    });
};