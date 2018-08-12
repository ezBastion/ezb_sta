var Service = require('node-windows').Service;
const path = require('path');
var config = require('./config.json')
// Create a new service object
var svc = new Service({
 name:'ezBastion sta ('+ config.issuer +')',
 description: 'ezBastion - secure token authority',
 script: path.join(__dirname, 'server.js')
});

// Listen for the 'install' event, which indicates the
// process is available as a service.
svc.on('install',function(){
 svc.start();
});

// install the service
svc.install();