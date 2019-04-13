'use strict';
const path = require('path');
var config = require(path.join(__dirname, '../../config.json'));

function token(params) {
    this.expire_in = config.jwtttl
    this.expire_at = Math.floor(Date.now() / 1000) + config.jwtttl;
    this.access_token = null
    this.token_type = 'bearer'
    this.sign_key  =  null
}


module.exports = token;