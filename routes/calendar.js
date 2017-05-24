/**
 * Created by sghaida on 5/24/2017.
 */

var express         = require('express'),
    breadcrumbs     = require('express-breadcrumbs'),
    router          = express.Router(),
    passport        = require('passport'),
    async           = require('async'),
    http            = require('http');


getCalendar = function (site) {
    var data = JSON.stringify({});
    var options = {
        host: 'orgcal.cf.cloud.ccg.local',
        port: '80',
        path: '/cal/orgcal/getby/org/' + site,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': data.length
        }
    };
    var req = http.request(options, function (response) {
        var msg = '';
        response.setEncoding('utf8');

        response.on('data', function(chunk) {
            msg += chunk;
        });
        response.on('end', function() {
            var calendar = JSON.parse(msg);
            var holidays = calendar.calendarDetails.holidays
            var result   = [],
                counter  = 0;

            holidays.forEach(function (day) {
                if(new Date(day.date) >= Date.now() && counter < 5){
                    counter +=1;
                    result.push({
                        date: new Date(day.date),
                        reason:  day.reason
                    });
                }
            });
            return result;
        });
    });
    req.write(data);
    req.end();
}


module.exports = getCalendar;
