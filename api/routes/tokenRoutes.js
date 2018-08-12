'use strict';

module.exports = function(app) {
  var staToken = require('../controllers/tokenController');

  app.route('/token/:tokenid?')
    .get(staToken.create_token)
    .post(staToken.create_token);
    
    
};