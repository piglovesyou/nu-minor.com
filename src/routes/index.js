
var soy = require('../soynode.js');
var db = require('../setupdb');
var isProduction = process.env.NODE_ENV === 'production';
var _ = require('underscore');


/*
 * GET home page.
 */

exports.view = function(req, res) {

  var userId = req.session.oauth &&
      req.session.oauth.access_token &&
      req.session.twitter &&
      req.session.twitter.user_id;

  db.item.find({type: 'youtube'}, function(err, items) {

    if (userId) {
      items.forEach(function(item) {
        item.userLiked = _.contains(item.like, userId);
      })
    }

    res.end(soy.render('app.soy.index', {
      isProduction: isProduction,
      isAuthed: req.session.oauth && req.session.oauth.access_token,
      items: items
    }));

  });
};

