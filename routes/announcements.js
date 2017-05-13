/**
 * Created by sghaida on 5/13/2017.
 */

var express         = require('express'),
    router          = express.Router(),
    passport        = require('passport'),
    auth            = require('../middleware/authentication'),
    Announcement    = require('../models/announcement');




module.exports = router;

