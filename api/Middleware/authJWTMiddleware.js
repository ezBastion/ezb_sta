'use strict';


module.exports = function (req, res, next, config) {
    let fs = require('fs')
    let path = require('path')
    var bearer = req.headers['authorization'];
    var certPath = path.join(__dirname, '../../', config.publiccert)
    var cert = fs.readFileSync(certPath);
    if (bearer) {
        if (bearer.split(' ').length == 2) {
            try {
                var jwt = require('jsonwebtoken');
                var decoded = jwt.verify(bearer.split(' ')[1], cert, { issuer: config.issuer, algorithms: 'ES256' });
                req.jwt = decoded;
                next();
            } catch (err) {
                console.log(err.message);
                res.status(403).send(err.message);
            }
        } else { next(); }
    } else { res.status(403).end(); }
}