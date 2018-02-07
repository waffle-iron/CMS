/**
 * Created by sghaida on 5/27/2017.
 */

var config = require('./config.json'),
    mongo  = require('mongoose');

module.exports  = {
    dbUri : function () {
        return config.mongo.uri;
    },
    secret: config.secret
}