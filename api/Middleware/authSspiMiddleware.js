'use strict';
module.exports = function (req, res, next) {
    var bcrypt = require('bcryptjs');
    var crypto = require('crypto');
    var nodeSSPI = require('node-sspi');
    console.log("aud:" + req.aud);
    var nodeSSPIObj = new nodeSSPI({
        retrieveGroups: true
    });
    if (req.aud == "internal") { next(); }

    nodeSSPIObj.authenticate(req, res, function (err) {
        if (!res.finished) {
            console.log("in sspi");
            const uuidv4 = require('uuid/v4');
            req.uuid = uuidv4();
            req.aud = "ad";
            req.sign_key = crypto.createHash('md5').update(bcrypt.genSaltSync(32)).digest('hex');
            next();
        }

    });
}