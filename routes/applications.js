/**
 * Created by sghaida on 5/23/2017.
 */

var express         = require('express'),
    breadcrumbs     = require('express-breadcrumbs'),
    router          = express.Router(),
    middleware      = require('../middleware/authentication'),
    passport        = require('passport'),
    auth            = require('connect-ensure-login'),
    Application     = require('../models/application'),
    Tag             = require('../models/tag'),
    Department      = require('../models/department'),
    async           = require('async'),
    formidable      = require('formidable');


/* GET list all applications*/
router.get('/', auth.ensureLoggedIn('/login'), function (req,res,next) {
    Application.find({}).populate('owner author').exec(function (err, apps) {
       if(err){
           console.log(err);
       } else {
           req.breadcrumbs([{name: 'Applications', url: '/applications'}]);
           res.render('applications/view', {applications: apps, breadcrumbs: req.breadcrumbs()});
        }
    });
});

/* POST add new application*/
router.post('/', auth.ensureLoggedIn('/login'), middleware.isSystemAdmin, function (req, res, next) {
    Application.create(req.body.application, function (err, application) {
        if(err){
            console.log(err);
        } else {
            application.author = req.user._id;
            application.tags =req.body.application.tags;
            application.owner = req.body.application.department;
            application.save();

            if(req.body['new-application'] === 'on') {
                res.redirect('/applications/new')
            } else {
                res.redirect('/applications');
            }
        }
    });
});

/* GET show New Application form*/
router.get('/new', auth.ensureLoggedIn('/login'), function (req, res, next) {
    async.parallel([
        function (cb) {
            Tag.find({},cb);
        },
        function (cb) {
            Department.find({},cb);
        }
    ],function (err, result) {
        if(err) {
            console.log( err)
        }else {
            console.log(result);
            req.breadcrumbs([{name: 'Applications', url: '/applications'}, {name: 'New', url: 'new'}]);
            res.render('applications/new', {tags: result[0], departments: result[1], breadcrumbs: req.breadcrumbs()});
        }
    });
});

/* GET  sow edit form for a specific application*/
router.get('/:id/edit', auth.ensureLoggedIn('/login'), middleware.isSystemAdmin, function (req, res, next) {
    async.parallel([
        function (cb) {
            Tag.find({},cb);
        },
        function (cb) {
            Department.find({},cb);
        },
        function (cb) {
            Application.findById(req.params.id).populate('department').exec(cb);
        }
    ],function (err, result) {
        if(err) {
            console.log(err);
        }else {
            console.log(result);

            if(result[2] === null){
                req.breadcrumbs({name: 'Applications', url: '/applications'})
                res.redirect('/applications', {breadcrumbs: req.breadcrumbs()});
            } else {
                req.breadcrumbs([{name: 'Applications', url: '/applications'}, {name: 'Edit', url: 'edit'}]);
                res.render('applications/edit', {tags: result[0], departments: result[1], application: result[2], breadcrumbs: req.breadcrumbs()});
            }
        }
    });
});

router.put('/:id', auth.ensureLoggedIn('/login'), middleware.isSystemAdmin, function (req, res,next) {
    Application.findByIdAndUpdate(req.params.id, req.body.application, function(err, toBeUpdated) {
        if(err){
            res.redirect('/applications');
        } else {
            res.redirect('/applications');
        }
    });
});

/* GET find app by app name  used by the global search box*/
router.get('/find/:name', auth.ensureLoggedIn('/login'),  function (req,res, next) {
   var query = req.params.name;
    Application.find({}).and([
       { $or: [{name: new RegExp(query, 'i')}, {description: new RegExp(query, 'i')}] }
   ]).populate('author owner').exec(function (err, apps) {
        if(err){
            console.log(err)
        }else {
            res.send(apps);
        }
    })
});

/* GET find app by app name*/
router.get('/filter/:name', auth.ensureLoggedIn('/login'), function (req,res, next) {
    var query = req.params.name;
    Application.find({}).and([
        { $or: [{name: new RegExp(query, 'i')}, {description: new RegExp(query, 'i')}] }
    ]).populate('author owner').exec(function (err, apps) {
        if(err){
            console.log(err)
        }else {
            req.breadcrumbs([{name: 'Applications', url: '/applications'}]);
            res.render('applications/view', {applications: apps, breadcrumbs: req.breadcrumbs()});
        }
    })
});

/* GET show Upload image form*/
router.get('/upload/image', auth.ensureLoggedIn('/login'), function (req, res, next) {
    req.breadcrumbs([{name: 'Applications', url: '/applications'}, {name: 'Upload', url: 'image'}]);
    res.render('applications/upload',{breadcrumbs: req.breadcrumbs()});
});

/* POST uploads Application image */
router.post('/upload/image', auth.ensureLoggedIn('/login'), function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req);

    form.on('fileBegin', function (name, file){
        var fileType = file.type.split('/').pop();
        if(fileType == 'svg'){
            //rename the incoming file
            file.path = 'public/images/applications/' + file.name;
        } else {
            console.log( 'incorrect file type: ' + fileType );
            req.flash('error', 'file type is not supported. Please consult with helpdesk regarding the file types');
        }
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
        res.redirect('/applications');
    });

});

module.exports = router;

