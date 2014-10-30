var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');
var session = require('express-session');
var swig = require('swig');

var swigFilter = require('./lib/swigFilter');

var routes = require('./routes/index');
var user = require('./routes/user');
var task = require('./routes/task');

var app = express();

// This is where all the magic happens!
app.engine('html', swig.renderFile);


// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
//app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });

swig.setFilter('moment', swigFilter.moment);
swig.setFilter('status', swigFilter.status);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'minos project', resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    if(req.session.username) {
        app.locals.username = req.session.username;
        app.locals.userGroupId = req.session.userGroupId;
    }
    next();
});


app.use('/', routes);
app.use('/user', user);
app.use('/task', task);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



app.locals.title2 = 'My App';

app.locals.momentDateTime = function(datetime) {
    return moment(datetime).format("YYYY-MM-DD HH:mm:ss");
}

module.exports = app;
