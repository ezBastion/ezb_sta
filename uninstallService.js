var Service = require('node-windows').Service;
const path = require('path');
// Create a new service object
var svc = new Service({
 name:'ezapi_sta',
 description: 'EZAPI STA - secure ticket authority',
 script: path.join(__dirname, 'server.js')
});

// Listen for the 'uninstall' event so we know when it is done.
svc.on('uninstall',function(){
 console.log('Uninstall complete.');
 console.log('The service exists: ',svc.exists);

});

// Uninstall the service.
svc.uninstall();