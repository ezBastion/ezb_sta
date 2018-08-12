'use strict';
module.exports = function (config) {
    var fs = require('fs')
        , path = require('path')
        , certFile = path.resolve(__dirname, '../', config.publiccert)
        , keyFile = path.resolve(__dirname, '../', config.privatekey)
        , caFile = path.resolve(__dirname, '../', config.cacert)
        , request = require('request');
    var options = {
        url: config.ezbdb + 'stas/' + config.issuer,
        agentOptions: {
            cert: fs.readFileSync(certFile),
            key: fs.readFileSync(keyFile),
            ca: fs.readFileSync(caFile)
        },

    };
    request.get(options, function (error, response, body) {
        if (error = null) {
            if (response.statusCode == 200) {
                var b = JSON.parse(body);
            } else {
                // console.log('create');
            }
        }
    });
}

