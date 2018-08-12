'use strict';

module.exports = function(app) {
  var staToken = require('../controllers/tokenController');

  app.route('/renew')
    .get(staToken.renew_token);
    
    
};