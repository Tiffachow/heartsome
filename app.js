var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var mongoose = require('mongoose');

var routes = require('./routes/index');

var app = express();

// var uri = 'mongodb://'+process.env.dbuser+':'+process.env.password+'@localhost:27017/heartsome';
var uri = 'mongodb://localhost:27017/test';
// 'mongodb://user:pass@host:port/database'
// 127.0.0.1 or localhost
mongoose.connect(uri, function(error) {
  // if error is truthy, the initial connection failed.
  if (error) {
    console.log("ERROR CONNECTING TO MONGOOSE: "+error);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/node_modules", express.static(path.join(__dirname, 'node_modules')));
app.use(session({
  cookieName: 'session',
  secret: 'acetones knessets uncurbs pyrone spurting misusage coseys insulars thymiest scantier',
  // encrypted session for an hour
  duration: 60 * 60 * 1000,
  activeDuration: 15 * 60 * 1000,
  cookie: {
    path: '/api', // cookie will only be sent to requests under '/api'
    ephemeral: false, // when true, cookie expires when the browser closes
    httpOnly: true, // when true, cookie is not accessible from javascript
    // secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
  }
}));

app.use('/', routes);

// CORS config
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://picllery-user-images.s3.amazonaws.com/*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
