var express     = require('express'),
    router      = express.Router(),
    passport    = require('passport'),
    auth        = require('../middleware/authentication');

/* GET home page. */
router.get('/', auth.isLoggedIn, function(req, res, next) {
  console.log(req.currentUser);
  res.render('index');
});

module.exports = router;
