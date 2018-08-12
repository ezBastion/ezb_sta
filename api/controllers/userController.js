'use strict';

// var StaUser = require("../models/userModel");
exports.get_access = function (req, res) {
    res.json(req.user);

};