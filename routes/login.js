/**
 * Created by sghaida on 5/12/2017.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login');
});

module.exports = router;