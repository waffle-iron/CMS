/**
 * Created by sghaida on 5/12/2017.
 */

var express = require('express'),
    passport = require('passport'),
    router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login');
});

var opts = { failWithError: true }

router.post('/', passport.authenticate('ldapauth', {
        session: true,
        successRedirect: '/',
        failureRedirect: '/login'
    }),
    function(req, res) {
        console.log(res)
        res.send({status: 'ok'});
    }
);

module.exports = router;