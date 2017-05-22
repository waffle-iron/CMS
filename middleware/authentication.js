/**
 * Created by sghaida on 5/12/2017.
 */

exports.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error','Please login first')
        res.redirect('/login');
    }
};

exports.isSystemAdmin = function (req, res, next) {
    if (req.user.roles.indexOf('system-admin') > -1){
        return next();
    } else {
        req.flash('error', 'you dont have permission');
        res.redirect('back');
    }
}

exports.isSiteAdmin = function (req, res, next) {
    if (req.user.roles.indexOf('site-admin') > -1){
        return next();
    } else {
        req.flash('error', 'you dont have permission');
        res.redirect('back');
    }
}