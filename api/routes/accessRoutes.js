'use strict';

module.exports = function(app) {
  var tokenAccess = require('../controllers/userController');

  app.route('/access')
    .get(tokenAccess.get_access);

};