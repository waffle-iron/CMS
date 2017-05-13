/**
 * Created by sghaida on 5/11/2017.
 */

var mongo           = require('mongoose'),
    Tag             = require('../models/tag'),
    User            = require('../models/user'),
    Application     = require('../models/application'),
    Department      = require('../models/department'),
    Announcement    = require('../models/announcement');


var departments = [
    {name: 'ISD', description: 'Information System Department'},
    {name: 'PMV', description: 'Procurement for Machinery and Vehicles '},
    {name: 'KM', description: 'Knowledge Management'},
    {name: 'OPS', description: 'Operations'},
    {name: 'COMMS', description: 'Communications'},
    {name: 'CSR', description: 'Corporate social responsibility'}
]

var tags = [
    {name: 'critical', description: 'critical'},
    {name: 'important', description: 'important'},
    {name: 'info', description: 'Informative'},
    {name: 'tax', description: 'Taxation related'},
    {name: 'travel', description: 'Travel related'},
    {name: 'isd', description: 'ISD related'},
    {name: 'csr', description: 'CSR Related'},
    {name: 'services', description: 'Services related'},
]

function seedDB() {

    Department.remove({}, function (err) {
        if(err){
            console.log(err);
        } else {
            departments.forEach(function (seed) {
                Department.create(seed, function (err, dep) {
                    if(err){
                        console.log(err);
                    } else {
                        console.log(dep);
                    }
                });
            });
        }
    });

    Tag.remove({}, function (err) {
        if(err){
            console.log(err);
        } else {
            departments.forEach(function (seed) {
                Tag.create(seed, function (err, tag) {
                    if(err){
                        console.log(err);
                    } else {
                        console.log(tag);
                    }
                });
            });
        }
    });

    Application.remove({}, function (err) {
        if(err){
            console.log(err);
        } else {
            //TODO: POPLATE Applications
        }
    });

    Announcement.remove({}, function (err) {
        if(err){
            console.log(err);
        } else {
            //TODO: POPLATE Announcements
        }
    });

    User.remove({}, function (err) {
        if(err){
            console.log(err);
        } else {
            //TODO: POPLATE USER
        }
    });
}

module.exports = seedDB;