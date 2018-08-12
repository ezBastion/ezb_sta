'use strict'
process.env.NODE_ENV = 'production';
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var server = require('http').createServer(app)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bcrypt = require('bcryptjs');
var mcache = require('memory-cache');

var config = require('./config.json');
// var r = require('./tools/register');
// r(config);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

/* TOKEN */

var authDB = require("./api/Middleware/authdbMiddleware")
app.use('/token', function (req, res, next) { authDB(req, res, next, config) })
var authform = require("./api/Middleware/authformMiddleware")
app.use('/token', function (req, res, next) { authform(req, res, next) })
var authSspi = require('./api/Middleware/authSspiMiddleware')
app.use('/token', function (req, res, next) { authSspi(req, res, next) })
var cache = require('./api/Middleware/cacheMiddleware')
app.use('/token', function (req, res, next) { cache(req, res, next, mcache, true, config) })
/* TOKEN */
/* ACCESS */
var jwt = require('./api/Middleware/authJWTMiddleware')
app.use('/access', function (req, res, next) { jwt(req, res, next, config) })
app.use('/access', function (req, res, next) { cache(req, res, next, mcache, false) })
/* ACCESS */
/* RENEW */
app.use('/renew', function (req, res, next) { jwt(req, res, next, config) })
app.use('/renew', function (req, res, next) { cache(req, res, next, mcache, false) })
/* RENEW */

var tokenRoutes = require('./api/routes/tokenRoutes');
tokenRoutes(app);
var accessRoutes = require('./api/routes/accessRoutes');
accessRoutes(app);
var renewRoutes = require('./api/routes/renewRoutes');
renewRoutes(app);


var port = config.port || 5000
server.listen(port, function () {
  console.log('ezb_sta server listening on port %d in %s mode', port, app.get('env'))
})