
var soy = require('../soynode.js');
var db = require('../setupdb');
var isProduction = process.env.NODE_ENV === 'production';

/*
 * GET home page.
 */

exports.view = function(req, res) {
  db.item.find({type: 'youtube'}, function(err, items) {

    // console.log(items[1].id);


    res.end(soy.render('app.soy.main', {
      isProduction: isProduction,
      items: items
    }));

  })
};
