'use strict';

const path = require('path');
let token = require("../models/tokenModel");
let jwt = require('jsonwebtoken');
let config = require(path.join(__dirname, '../../config.json'));
let fs = require('fs')
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
exports.create_token = function (req, res) {
    var t = new token();
    var certPath = path.join(__dirname, '../../', config.privatekey)
    var cert = fs.readFileSync(certPath);
    var j = jwt.sign(
        {
            jti: req.uuid,
            iss: config.issuer,
            sub: req.connection.user,
            aud: req.aud,
            exp: t.expire_at
        },
        cert,
        {
            algorithm: 'ES256'
        }
    );
    t.access_token = j;
    // t.sign_key = req.sign_key;
    res.json(t);
};

exports.renew_token = function (req, res) {
    if (req.user) {
        var t = new token();
        var certPath = path.join(__dirname, '../../', config.privatekey)
        var cert = fs.readFileSync(certPath);
        var j = jwt.sign(
            {
                jti: req.jwt.jti,
                iss: config.issuer,
                sub: req.user.user,
                aud: req.jwt.aud,
                exp: t.expire_at
            },
            cert,
            {
                algorithm: 'ES256'                
            }
        );
        t.access_token = j;
        // t.sign_key = crypto.createHash('md5').update(bcrypt.genSaltSync(32)).digest('hex');
        // req.user.sign_key = t.sign_key;
        req.mcache.put(req.jwt.jti, req.user, config.jwtttl * 1000);
        res.json(t);
    } else {
        res.status(403).end();
    }
};

