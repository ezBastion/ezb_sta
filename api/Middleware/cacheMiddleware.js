'use strict';

module.exports = function (req, res, next, mcache, create, config) {
  if (!res.finished) {
    var StaUser = require("../models/userModel");
    if (create) {
      var u = new StaUser();
      u.user = req.connection.user;
      u.userSid = req.connection.userSid;
      u.userGroups = req.connection.userGroups;
      u.sign_key = req.sign_key;
      mcache.put(req.uuid, u, config.jwtttl * 1000);
    } else {
      let c = mcache.get(req.jwt.jti);
      if (c) {
        var u = new StaUser();
        u.user = c.user;
        u.userSid = c.userSid;
        u.userGroups = c.userGroups;
        u.sign_key = c.sign_key;
        req.user = u;  
        req.mcache = mcache;       
      } else {
        console.log("cache not found jti: %s", req.jwt.jti);
      }
    }
  }
  next()
}