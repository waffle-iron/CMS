/**
 * Created by sghaida on 5/11/2017.
 */

var mongo           = require('mongoose'),
    ObjectId           = mongo.Types.ObjectId;
    Tag             = require('../models/tag'),
    User            = require('../models/user'),
    Role            = require('../models/role'),
    Application     = require('../models/application'),
    Department      = require('../models/department'),
    Announcement    = require('../models/announcement');


var departments = [
    {_id:  ObjectId("5922895f16dd790518d1e110"), name: 'ISD', description: 'Information System Department', picture: '/images/departments/isd.svg'},
    {_id:  ObjectId("5922895f16dd790518d1e111"), name: 'PMV', description: 'Procurement for Machinery and Vehicles ', picture: '/images/departments/default.svg'},
    {_id:  ObjectId("5922895f16dd790518d1e112"), name: 'KM', description: 'Knowledge Management', picture: '/images/departments/default.svg'},
    {_id:  ObjectId("5922895f16dd790518d1e113"), name: 'CSR', description: 'Corporate social responsibility', picture: '/images/departments/csr.svg'},
    {_id:  ObjectId("5922895f16dd790518d1e114"), name: 'SVC', description: 'Services', picture: '/images/departments/svc.svg'},
    {_id:  ObjectId("5922895f16dd790518d1e115"), name: 'CIB', description: 'Consolidated Insurance Brokers', picture: '/images/departments/cib.svg'},
    {_id:  ObjectId("5922895f16dd790518d1e116"), name: 'HR', description: 'Human Resource', picture: '/images/departments/hr.svg'},
    {_id:  ObjectId("5922895f16dd790518d1e117"), name: 'MAC', description: 'Managing office Accounts', picture: '/images/departments/mac.svg'}
]

var tags = [
    {_id: ObjectId("592288ee19b61c135c41d332"), name: 'critical', description: 'Critical', color: 'red'},
    {_id: ObjectId("592288ee19b61c135c41d333"), name: 'downtime', description: 'Services downtime', color: 'red'},
    {_id: ObjectId("592288ee19b61c135c41d334"), name: 'important', description: 'Important', color: 'orange'},
    {_id: ObjectId("592288ee19b61c135c41d335"), name: 'security', description: 'Security Related', color: 'orange'},
    {_id: ObjectId("592288ee19b61c135c41d336"), name: 'info', description: 'Informative', color: 'yellow'},
    {_id: ObjectId("592288ee19b61c135c41d337"), name: 'news', description: 'Mail Related', color: 'teal'},
    {_id: ObjectId("592288ee19b61c135c41d338"), name: 'awards', description: 'Mail Related', color: 'olive'},
    {_id: ObjectId("592288ee19b61c135c41d339"), name: 'service', description: 'Service related', color: 'blue'},
    {_id: ObjectId("592288ee19b61c135c41d33a"), name: 'tax', description: 'Tax related', color: 'green'},
    {_id: ObjectId("592288ee19b61c135c41d33b"), name: 'travel', description: 'Travel related', color: 'blue'},
    {_id: ObjectId("592288ee19b61c135c41d33c"), name: 'procedure', description: 'Procedure', color: 'green'},
    {_id: ObjectId("592288ee19b61c135c41d33d"), name: 'project', description: 'Mail Related', color: 'brown'},
]

var roles = [
    {_id: ObjectId("59200ab998d04d097040af6e"), name: 'system-admin', description: 'administer system related functionalities'},
    {_id: ObjectId("59200ab998d04d097040af6f"), name: 'site-admin', description: 'administer site related functionalities'},
    {_id: ObjectId("592523ffb6680c365c61c3fc"), name: 'user', description: 'unprivileged user'}
]

var apps = [
    {
        _id: ObjectId("592287f03009782848a80098"),
        name: 'ISD Wiki',
        description: 'Information Systems Department Wiki',
        imageUrl: '/images/applications/isd-wiki-bw_icon.svg',
        url: 'https://wiki.ccc.gr',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: ObjectId("592416130fc2fd16dc6a7071"),
        owner: ObjectId("5922895f16dd790518d1e110"),
        isOnline: false
    },{
        _id: ObjectId("592287f03009782848a80099"),
        name: 'AD Manager',
        description: 'Manage Engine Active Directory Manager',
        imageUrl: '/images/applications/isd-ad-bw_icon.svg',
        url: 'https://cloud-adman-01.cloud.ccg.local:8443/',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: ObjectId("592416130fc2fd16dc6a7071"),
        owner: ObjectId("5922895f16dd790518d1e110"),
        requirePermission: true,
        isSystemAdmin: true,
        isOnline: true
    },{
        _id: ObjectId("592287f03009782848a8009a"),
        name: 'Academy',
        description: 'CCC Learning Platform',
        imageUrl: '/images/applications/academy-bw_icon.svg',
        url: 'https://ccctraining.ccc.net',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: ObjectId("592416130fc2fd16dc6a7071"),
        owner: ObjectId("5922895f16dd790518d1e110"),
        requirePermission: true,
        isOnline: false
    },{
        _id: ObjectId("592287f03009782848a8009b"),
        name: 'My Files',
        description: 'Next-cloud File Sharing',
        imageUrl: '/images/applications/my-files-bw_icon.svg',
        url: 'http://share.ccc.net',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: ObjectId("592416130fc2fd16dc6a7071"),
        owner: ObjectId("5922895f16dd790518d1e110"),
        requirePermission: true,
        isOnline: true
    },{
        _id: ObjectId("592287f03009782848a8009c"),
        name: 'Fanous',
        description: 'Knowledge Management Platform',
        imageUrl: '/images/applications/fanous-bw_icon.svg',
        url: 'http://fanous.ccc.gr',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: ObjectId("592416130fc2fd16dc6a7071"),
        owner: ObjectId("5922895f16dd790518d1e110"),
        requirePermission: true,
        isOnline: false
    },{
        _id: ObjectId("592287f03009782848a8009d"),
        name: 'Webmail',
        description: 'MOA Webmail',
        imageUrl: '/images/applications/webmail-icon.svg',
        url: 'https://moawebmail.ccc.gr/owa',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: ObjectId("592416130fc2fd16dc6a7071"),
        owner: ObjectId("5922895f16dd790518d1e110"),
        isOnline: true
    },{
        _id: ObjectId("592287f03009782848a8009e"),
        name: 'Maximo',
        description: 'IBM Maximo',
        imageUrl: '/images/applications/maximo-bw_icon.svg',
        url: 'http://maximo.ccc.gr',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: ObjectId("592416130fc2fd16dc6a7071"),
        owner: ObjectId("5922895f16dd790518d1e110"),
        requirePermission: true,
        isOnline: false
    },{
        _id: ObjectId("592287f03009782848a8009f"),
        name: 'Citrix',
        description: 'Citrix Apps',
        imageUrl: '/images/applications/citrix-bw_icon.svg',
        url: 'https://apps.ccc.net',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: ObjectId("592416130fc2fd16dc6a7071"),
        owner: ObjectId("5922895f16dd790518d1e110"),
        requirePermission: true,
        isOnline: true
    },{
        _id: ObjectId("592287f03009782848a800a0"),
        name: 'iBill',
        description: 'Lync Telephony Billing System',
        imageUrl: '/images/applications/ibill-bw_icon.svg',
        url: 'http://ibill.ccc.gr/ibill',
        exposedTo: {sites: ['MOA'], countries: ['greece']},
        author: ObjectId("592416130fc2fd16dc6a7071"),
        owner: ObjectId("5922895f16dd790518d1e110"),
        isOnline: true
    }
]

var users = [
    {
        _id: ObjectId("592416130fc2fd16dc6a7071"),
        employeeid: '418732',
        name: 'Saddam Abu Ghaida',
        mail: 'SGhaida@ccc.net',
        title: 'SR IT SUPPORT ENGINEER',
        office: 'MOA',
        department: 'ISD',
        country: 'Greece',
        listOfApps: [],
        roles: [ObjectId("59200ab998d04d097040af6e")],
        accountEnabled: true
    },{
        _id: ObjectId("592416130fc2fd16dc6a7072"),
        employeeid: '580181',
        name: 'Robert Naccache',
        mail: 'rnaccache@ccc.net',
        title: 'IT Support Engineer',
        department: 'ISD',
        office: 'MOA',
        country: 'Greece',
        listOfApps: [],
        roles: [ObjectId("59200ab998d04d097040af6f")],
        accountEnabled: true
    },{
        _id: ObjectId("592416130fc2fd16dc6a7073"),
        employeeid: '418734',
        name: 'Nader Barakat',
        mail: 'nbarakat@ccc.net',
        title: 'Sr. IT Support Engineer',
        department: 'ISD',
        office: 'MOA',
        country: 'Greece',
        listOfApps: [],
        roles: ObjectId("59200ab998d04d097040af6f"),
        accountEnabled: true
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
            //TODO: POPULATE Announcements
        }
    });


}

module.exports = seedDB;