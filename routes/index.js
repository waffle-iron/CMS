var express     = require('express'),
    router      = express.Router(),
    passport    = require('passport'),
    auth        = require('connect-ensure-login');
/* GET home page. */
router.get('/', auth.ensureLoggedIn('/login'), function(req, res, next) {
  console.log(req.currentUser);
  res.render('index');
});

router.get('/test',auth.ensureLoggedIn('/login'), function(req, res, next) {
    console.log(req.currentUser);
    res.render('test');
});

router.post('/test', function (req, res, next) {
    console.log('tags is : ' + req.body.tags);

});

module.exports = router;
