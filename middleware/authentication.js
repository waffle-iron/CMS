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