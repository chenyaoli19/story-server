var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var story = require('./routes/story');
var event = require('./routes/event');
var auth = require('./routes/auth');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');

var config = require('./configs/main');
var mongoose = require('mongoose');
var dbUrl = config.db.url;
var dbName = config.db.dbName;
mongoose.connect('mongodb://' + dbUrl+ '/' + dbName);
var cors = require('cors');
var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

/**
 *Endpoint Routers
 */
app.use('/api/test', function(req,res,next){
    res.json('Server is running, you can start programming!');
});
app.use('/story',story);
app.use('/event', event);
app.use('/auth',auth);

app.use(function(req,res,next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
module.exports = app;
