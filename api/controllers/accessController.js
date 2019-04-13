'use strict';

var StaUser = require("../models/userModel");
exports.get_access = function (req, res) {
    var u = new StaUser(req.connection);
    res.json(u);

};