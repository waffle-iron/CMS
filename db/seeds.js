/**
 * Created by sghaida on 5/11/2017.
 */

var mongo           = require('mongoose'),
    Tag             = require('../models/tag'),
    User            = require('../models/user'),
    Role            = require('../models/role'),
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

var roles = [
    {name: 'system-admin', description: 'administer system related functionalities'},
    {name: 'site-admin', description: 'administer site related functionalities'},
]

var apps = [
    {
        name: 'ISD Wiki',
        description: 'Information Systems Department Wiki',
        imageUrl: 'images/applications/isd-wiki-bw_icon.svg',
        url: 'https://wiki.ccc.gr',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: {emailAddress: 'sghaida@ccc.net'},
        isOnline: false
    },{
        name: 'AD Manager',
        description: 'Manage Engine Active Directory Manager',
        imageUrl: 'images/applications/isd-ad-bw_icon.svg',
        url: 'https://cloud-adman-01.cloud.ccg.local:8443/',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: {emailAddress: 'rnaccache@ccc.net'},
        isOnline: true
    },{
        name: 'Academy',
        description: 'CCC Learning Platform',
        imageUrl: 'images/applications/academy-bw_icon.svg',
        url: 'https://ccctraining.ccc.net',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: {emailAddress: 'sghaida@ccc.net'},
        isOnline: false
    },{
        name: 'My Files',
        description: 'Next-cloud File Sharing',
        imageUrl: 'images/applications/my-files-bw_icon.svg',
        url: 'http://share.ccc.net',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: {emailAddress: 'rnaccache@ccc.net'},
        isOnline: true
    },{
        name: 'Fanous',
        description: 'Knowledge Management Platform',
        imageUrl: 'images/applications/fanous-bw_icon.svg',
        url: 'http://fanous.ccc.gr',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: {emailAddress: 'sghaida@ccc.net'},
        isOnline: false
    },{
        name: 'Webmail',
        description: 'MOA Webmail',
        imageUrl: 'images/applications/webmail-icon.svg',
        url: 'https://moawebmail.ccc.gr/owa',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: {emailAddress: 'rnaccache@ccc.net'},
        isOnline: true
    },{
        name: 'Maximo',
        description: 'IBM Maximo',
        imageUrl: 'images/applications/maximo-bw_icon.svg',
        url: 'http://maximo.ccc.gr',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: {emailAddress: 'sghaida@ccc.net'},
        isOnline: false
    },{
        name: 'Citrix',
        description: 'Citrix Apps',
        imageUrl: 'images/applications/citrix-bw_icon.svg',
        url: 'https://apps.ccc.net',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: {emailAddress: 'rnaccache@ccc.net'},
        isOnline: true
    },{
        name: 'iBill',
        description: 'Lync Telephony Billing System',
        imageUrl: 'images/applications/ibill-bw_icon.svg',
        url: 'http://ibill.ccc.gr/ibill',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: {emailAddress: 'rnaccache@ccc.net'},
        isOnline: true
    }
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

    Role.remove({}, function (err) {
        if(err){
            console.log(err);
        } else {
            roles.forEach(function (seed) {
                Role.create(seed, function (err, tag) {
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
            apps.forEach(function (seed) {
                Application.create(seed, function (err, tag) {
                    if(err){
                        console.log(err);
                    } else {
                        console.log(tag);
                    }
                });
            });
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