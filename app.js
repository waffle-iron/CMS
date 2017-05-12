/* Dependencies */
var express                 = require('express'),
    expressSession          = require('express-session'),
    path                    = require('path'),
    favicon                 = require('serve-favicon'),
    logger                  = require('morgan'),
    cookieParser            = require('cookie-parser'),
    bodyParser              = require('body-parser'),
    mongo                   = require('mongoose'),
    passport                = require('passport'),
    methodOverride          = require('method-override'),
    flash                   = require('connect-flash'),
    seedDB                  = require('./db/seeds');

/* Routes */
var index       = require('./routes/index'),
    users       = require('./routes/users'),
    login       = require('./routes/login');

var app = express();

//Mongo Connection setup
var dbURI = 'mongodb://localhost/ccc-portal';

mongo.connect('mongodb://localhost/ccc-portal');

/*CONNECTION EVENTS*/

/*When successfully connected*/
mongo.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
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

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* initialize the session */
app.use(expressSession({
    secret: '=25_ar;p1100',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000}
}));

app.use(passport.initialize());
app.use(passport.session());

//passport.serializeUser (User.serializeUser());
//passport.deserializeUser (User.deserializeUser());
//passport.use(new localStrategy(User.authenticate()));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('=25_ar;p1100'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(flash());

/* define the used routes*/
app.use('/', index);
app.use('/users', users);
app.use('/login', login);

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
