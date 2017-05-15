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

var users = [
    {
        employeeid: '418732',
        name: 'Saddam Abu Ghaida',
        mail: 'SGhaida@ccc.net',
        title: 'SR IT SUPPORT ENGINEER',
        office: 'MOA',
        department: 'ISD',
        country: 'Greece',
        listOfApps: []
    },{
        employeeid: '580181',
        name: 'Robert Naccache',
        mail: 'rnaccache@ccc.net',
        title: 'IT Support Engineer',
        department: 'ISD',
        office: 'MOA',
        country: 'Greece',
        listOfApps: []
    },{
        employeeid: '418734',
        name: 'Nader Barakat',
        mail: 'nbarakat@ccc.net',
        title: 'Sr. IT Support Engineer',
        department: 'ISD',
        office: 'MOA',
        country: 'Greece',
        listOfApps: []
    }
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
            tags.forEach(function (seed) {
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
            users.forEach(function (seed) {
                User.create(seed, function (err, user) {
                    if(err){
                        console.log(err);
                    } else {
                        console.log(user);
                    }
                });
            });
        }
    });
}

module.exports = seedDB;