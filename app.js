var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var mailadress = require('./routes/mailadress');
var nymailadress = require('./routes/nymailadress');
var admin = require('./routes/admin');

// ändrat 'app' i ursprunglig kod till 'ramverk'
//var app = express();
var ramverk = express();

ramverk.use(logger('dev'));
ramverk.use(express.json());
ramverk.use(express.urlencoded({ extended: false }));
ramverk.use(cookieParser());
ramverk.use(express.static(path.join(__dirname, 'public')));

ramverk.use('/', indexRouter);
ramverk.use('/mailadress', mailadress);
ramverk.use('/nymailadress', nymailadress);
ramverk.use('/admin', admin);

module.exports = ramverk;
