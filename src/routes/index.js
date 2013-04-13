
var soy = require('../soynode.js');
var db = require('../setupdb');
var isProduction = process.env.NODE_ENV === 'production';

/*
 * GET home page.
 */

exports.view = function(req, res) {
  db.item.find({type: 'youtube'}, function(err, items) {

    res.end(soy.render('app.soy.index', {
      isProduction: isProduction,
      items: items
    }));

  })
};
