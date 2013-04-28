
var soy = require('../soynode.js');
var Q = require('q');
var db = require('../setupdb');
var isProduction = process.env.NODE_ENV === 'production';
var _ = require('underscore');


var find = Q.denodeify(db.item.find.bind(db.item));

var isAuthed = function(req) {
  // Means we have already authed, fetched user profile.
  return !!(req.session &&
            req.session.twitter &&
            req.session.twitter.id);
};

/*
 * GET home page.
 */

exports.index = function(req, res) {

  var isAuthed_ = isAuthed(req),
      userId = isAuthed_ && req.session.twitter.id;

  var feature = [
    '-3JCESdFNyw',
    'j3S3Txsl2vs',
    'WQO-aOdJLiw',
    'tb3qxDrsA0M',
    '89726554',
    '89728820',
    '93t1H-EkUj4',
    // 'kcVh-tXfwZw',
    // 'RIFSuAJhTlg',
    // '4SBXcybIo3o'
  ];

  find({id: {$in: feature}}, null, { })
  .then(function(items) {
    if (userId) {
      _.each(items, function(item) {
        item.userLiked = _.contains(item.nm_like, userId);
        item.userMarkedBad = _.contains(item.nm_bad, userId);
      });
    }

    res.end(soy.render('app.soy.index', {
      isProduction: isProduction,
      isAuthed: !!(isAuthed_ && req.session.oauth.access_token),
      twitter: isAuthed_ ? req.session.twitter : null,
      items: items
    }));
  });

};

