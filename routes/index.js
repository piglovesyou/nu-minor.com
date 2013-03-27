var soy = require('../soynode.js');
var isProduction = process.env.NODE_ENV === 'production';

/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.end(soy.render('app.soy.main', {
    isProduction: isProduction
  }));
};
