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
    {name: 'ISD', description: 'Information System Department', picture: '/images/departments/isd.svg'},
    {name: 'PMV', description: 'Procurement for Machinery and Vehicles ', picture: '/images/departments/default.svg'},
    {name: 'KM', description: 'Knowledge Management', picture: '/images/departments/default.svg'},
    {name: 'CSR', description: 'Corporate social responsibility', picture: '/images/departments/csr.svg'},
    {name: 'SVC', description: 'Services', picture: '/images/departments/svc.svg'},
    {name: 'CIB', description: 'Consolidated Insurance Brokers', picture: '/images/departments/cib.svg'},
    {name: 'HR', description: 'Human Resource', picture: '/images/departments/hr.svg'},
    {name: 'MAC', description: 'Managing office Accounts', picture: '/images/departments/mac.svg'}
]

var tags = [
    {name: 'critical', description: 'Critical', color: 'red'},
    {name: 'downtime', description: 'Services downtime', color: 'red'},
    {name: 'important', description: 'Important', color: 'orange'},
    {name: 'security', description: 'Security Related', color: 'orange'},
    {name: 'info', description: 'Informative', color: 'yellow'},
    {name: 'news', description: 'Mail Related', color: 'teal'},
    {name: 'awards', description: 'Mail Related', color: 'olive'},
    {name: 'service', description: 'Service related', color: 'blue'},
    {name: 'tax', description: 'Tax related', color: 'green'},
    {name: 'travel', description: 'Travel related', color: 'blue'},
    {name: 'procedure', description: 'Procedure', color: 'green'},
    {name: 'project', description: 'Mail Related', color: 'brown'},
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