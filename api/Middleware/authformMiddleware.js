'use strict';

module.exports = function (req, res, next) {

    if (req.body.grant_type == "password") {
        var util = require('util')
        var auth = util.format("Basic %s", new Buffer(util.format("%s:%s", req.body.username, req.body.password)).toString('base64'));
        req.headers['authorization'] = auth
        console.log("grant_type ok add headers authorization, next");
        console.log("aud:" + req.aud);
    }
    next();
}