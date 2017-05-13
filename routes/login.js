/**
 * Created by sghaida on 5/12/2017.
 */

var express     = require('express'),
    passport    = require('passport'),
    router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', passport.authenticate('ldapauth', {
        session: true,
        successReturnToOrRedirect: '/',
        failureRedirect: '/login'
    }),
    function(req, res) {
        // var returnTo = '/'
        // if (req.session.returnTo) {
        //     returnTo = req.session.returnTo
        //     delete req.session.returnTo
        // }
        //console.log(res)
        //res.send({status: 'ok'});
    }
);

module.exports = router;