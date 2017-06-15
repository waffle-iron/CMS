/* Dependencies */
var express                 = require('express'),
    expressSession          = require('express-session'),
    breadcrumbs             = require('express-breadcrumbs'),
    path                    = require('path'),
    favicon                 = require('serve-favicon'),
    logger                  = require('morgan'),
    cookieParser            = require('cookie-parser'),
    bodyParser              = require('body-parser'),
    mongo                   = require('mongoose'),
    passport                = require('passport'),
    LdapStrategy            = require('passport-ldapauth').Strategy,
    methodOverride          = require('method-override'),
    flash                   = require('connect-flash'),
    config                  = require('./config'),
    seedDB                  = require('./db/seeds');

/* Routes */
var index           = require('./routes/index'),
    users           = require('./routes/users'),
    announcements   = require('./routes/announcements'),
    applications    = require('./routes/applications'),
    accessrequest   = require('./routes/requestAccess'),
    login           = require('./routes/login'),
    logout          = require('./routes/logout');

var app = express();

//Mongo Connection setup
//var dbURI = 'mongodb://localhost/ccc-portal';

mongo.connect(config.dbUri());

/*CONNECTION EVENTS*/

/*When successfully connected*/
mongo.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + config.dbUri());
});

/*If the connection throws an error*/
mongo.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

/*When the connection is disconnected*/
mongo.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

/*If the Node process ends, close the Mongoose connection*/
process.on('SIGINT', function() {
    mongo.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

/* populate the database with some initial data*/
seedDB();

//setup breadcrump
app.use(breadcrumbs.init());
app.use(breadcrumbs.setHome());
app.use('/', breadcrumbs.setHome({
    name: 'Home',
    url: '/'
}));

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* initialize the session */
app.use(expressSession({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10800000, httpOnly: true} // 3h
}));


var ldapOpts = {
    server: {
        url: 'ldap://10.1.0.230:3268',
        bindDn: 'CN=LDAPU,DC=gr,DC=ccg,DC=local',
        bindCredentials: 'Admin1Admin2@',
        searchBase: 'dc=ccg,dc=local',
        searchFilter: '(&(objectcategory=person)(objectclass=user)(|(samaccountname={{username}})(mail={{username}})))',
        searchAttributes: [
            'displayName',
            'givenname',
            'mail',
            'samaccountname',
            'employeeid',
            'title',
            'department',
            'co',
            'physicaldeliveryofficename',
            'thumbnailphoto'
        ],
        includeRaw: true
    }
};

passport.use(new LdapStrategy(ldapOpts));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    //user.thumbnailPhoto = conv(user.thumbnailPhoto , {in: 'binary', out:'bytes'});
    var sessionUser = {
        _id: user._id,
        dn: user.dn,
        employeeid: user.employeeID,
        name: user.displayName,
        firstname: user.givenName,
        samaccountname: user.sAMAccountName,
        mail: user.mail,
        title: user.title,
        office: user.physicalDeliveryOfficeName,
        country: user.co || 'Greece',
        department: user.department,
        thumbnail:  Buffer.from(user._raw.thumbnailPhoto,'binary').toString('base64'),
        roles: user.roles
    };

    done(null, sessionUser);
});

passport.deserializeUser(function(sessionUser, done) {
    done(null, sessionUser);
});
//passport.use(new localStrategy(User.authenticate()));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.secret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(flash());


//define global variables
//pass the user info implicitly for every single route
app.use(function (req, res, next) {
    console.log(req.user);
    res.locals.currentUser = req.user;
    //res.locals.currentUserId = req.
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

/* define the used routes*/
app.use('/', index);
app.use('/users', users);
app.use('/announcements', announcements);
app.use('/applications', applications);
app.use('/request/access', accessrequest);
app.use('/login', login);
app.use('/logout', logout);

/*catch 404 and forward to error handler*/
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*error handler*/
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
