/**
 * Created by sghaida on 5/24/2017.
 * Used to connect to company's Work Schedule API for WorkSchedule widget.
 */

var express         = require('express'),
    breadcrumbs     = require('express-breadcrumbs'),
    router          = express.Router(),
    passport        = require('passport'),
    async           = require('async'),
    unirest         = require('unirest');


getCalendar = function (site,cb) {


    var req = unirest.get('http://Application-URL-GOES-HERE' + site).header(
        {'Content-Type': 'application/json; '}
    ).end(function (response) {

        var result = [],
            counter = 0,
            holdiays = response.body.calendarDetails.holidays;


        holdiays.forEach(function (holdiay) {
            if(Date.now() <= new Date(holdiay.date) && counter <5){
                result.push({
                    date    :  new Date(holdiay.date),
                    reason  :   holdiay.reason
                });
            }
        });

        return cb(null,result);
    });
}


module.exports = getCalendar;
