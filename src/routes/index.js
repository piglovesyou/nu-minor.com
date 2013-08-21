
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

var whenFail = function(res) {
  return function(reason) {
    assert.fail(reason);
    res.end(JSON.stringify(reason));
  };
};

var sortAs = function(idArr, objArr) {
  var r = [];
  idArr.forEach(function(id, i) {
    r[i] = _.find(objArr, function(obj) {
      return obj.id === id;
    });
  });
  return r;
};

/*
 * GET home page.
 */

exports.index = function(req, res) {

  var isAuthed_ = isAuthed(req),
      userId = isAuthed_ && req.session.twitter.id;

  var feature = [
    'j3S3Txsl2vs',
    '93t1H-EkUj4',
    '89728820',
    '-3JCESdFNyw',
    '89726554',
    'tb3qxDrsA0M',
    'WQO-aOdJLiw'
  ];

  var itemsRef;
  // TODO: Find features
  // find({id: {$in: feature}}, null, { })
  find()
  .then(function(items) {
    
    itemsRef = items; // = sortAs(feature, items);

    if (userId) {
      _.each(items, function(item) {
        item.userLiked = _.contains(item.nm_like, userId);
        item.userMarkedBad = _.contains(item.nm_bad, userId);
      });
    }

  })
  .then(function() {
    // return find({id: {$nin: feature}});
  })
  .then(function(items) {

    res.end(soy.render('app.soy.index', {
      isProduction: isProduction,
      isAuthed: !!(isAuthed_ && req.session.oauth.access_token),
      twitter: isAuthed_ ? req.session.twitter : null,
      items: itemsRef.concat(items ? _.shuffle(items) : [])
    }));

  })
  .fail(whenFail);

};

