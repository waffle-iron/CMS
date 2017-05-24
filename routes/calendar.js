/**
 * Created by sghaida on 5/24/2017.
 */

var express         = require('express'),
    breadcrumbs     = require('express-breadcrumbs'),
    router          = express.Router(),
    passport        = require('passport'),
    async           = require('async'),
    unirest         = require('unirest');


getCalendar = function (site,cb) {


    var req = unirest.get('http://orgcal.cf.cloud.ccg.local/cal/orgcal/getby/org/' + site).header(
        {'Content-Type': 'application/json; '}
    ).end(function (response) {

        var result = [],
            counter = 0,
            holdiays = response.body.calendarDetails.holidays;


        holdiays.forEach(function (holdiay) {
            if(Date.now() <= new Date(holdiay.date) && counter <5){
                result.push({
                    date    :  Date(holdiay.date),
                    reason  :   holdiay.reason
                });
            }
        });

        return cb(null,result);
    });
}


module.exports = getCalendar;
