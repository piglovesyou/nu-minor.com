
var soy = require('../soynode.js');
var Q = require('q');
var db = require('../setupdb');
var isProduction = process.env.NODE_ENV === 'production';
var _ = require('underscore');


var find = Q.denodeify(db.item.find.bind(db.item));


/*
 * GET home page.
 */

exports.index = function(req, res) {

  var userId = req.session.oauth &&
      req.session.oauth.access_token &&
      req.session.twitter &&
      req.session.twitter.user_id;

  find({type: 'youtube'}, null, { limit: 25 })
  .then(function(items) {

    if (userId) {
      _.each(items, function(item) {
        item.userLiked = _.contains(item.like, userId);
        item.userMarkedBad = _.contains(item.bad, userId);
      });
    }

    res.end(soy.render('app.soy.index', {
      isProduction: isProduction,
      isAuthed: req.session.oauth && req.session.oauth.access_token,
      items: items
    }));

  });

};

