'use strict';

module.exports = function (req, res, next, config) {
    var bcrypt = require('bcryptjs');
    var crypto = require('crypto');

    if (req.body.grant_type == "password") {
        var fs = require('fs')
            , path = require('path')
            , certFile = path.resolve(__dirname, '../../', config.publiccert)
            , keyFile = path.resolve(__dirname, '../../', config.privatekey)
            , caFile = path.resolve(__dirname, '../../', config.cacert)
            , request = require('request');
        var options = {
            url: config.ezbdb + 'accounts/' + req.body.username,
            agentOptions: {
                cert: fs.readFileSync(certFile),
                key: fs.readFileSync(keyFile),
                ca: fs.readFileSync(caFile)
            },
            
        };
        request.get(options, function (error, response, body) {
            if (error != null) {
                console.log(error)
                next();
            }
            if (response.statusCode == 200) {
                var b = JSON.parse(body);
                var testHash = crypto.createHash('sha256').update(req.body.password + b.salt).digest('hex');
                if (testHash == b.password) {
                    req.connection = {};
                    const uuidv4 = require('uuid/v4');
                    req.uuid = uuidv4();
                    req.aud = 'internal';
                    req.connection.user = b.name;
                    req.sign_key = crypto.createHash('md5').update(bcrypt.genSaltSync(32)).digest('hex');
                    next()
                } else {
                    console.log(req.body.username + " found in db but bad password, next");
                    next();
                }
            } else {
                console.log(error)
                console.log(req.body.username + " not found in db, next");
                next();
            }
        });
    } else {
        console.log("No grant_type, next");
        next();
    }
}