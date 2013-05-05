
var Q = require('q');
var db = require('../setupdb');
var assert = require('assert');
var _ = require('underscore');



var findOne = Q.denodeify(db.item.findOne.bind(db.item));
var findUsers = Q.denodeify(db.user.find.bind(db.user));
var update = Q.denodeify(db.item.update.bind(db.item));

var whenFail = function(res) {
  return function(reason) {
    assert.fail(reason);
    res.end(JSON.stringify(reason));
  };
};



// GET handlers
exports.view = function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json;charset=UTF8'});

  var itemId = req.params.itemId;
  var item;
  var result;

  var q = findOne({id: itemId}, {_id: 0})
  .then(function(i) {
    item = i;
  });

  if (req.query && req.query.expand) {
    req.query.expand.split(',').forEach(function(e) {
      var field;
      switch (e) {
        case 'like':
        case 'bad':
          field = 'nm_' + e;
          break;
        default:
          return;
      }
      q = q.then(function() {
        return findUsers({id: {$in: item[field]}});
      })
      .then(function(users) {
        result = result || {};
        result[field] = users;
      });
    });
  }

  q.fail(whenFail(res))
  .done(function() {
    // What is going on in `item' object..
    res.end(JSON.stringify(result || item));
  });

};



var createSwapArg = function(userId, hadUserInPush, toPush, toPull) {
  var arg = {};
  if (hadUserInPush) {
    // Just pull userId and return
    arg.$pull = {};
    arg.$pull[toPush] = userId;
    return arg;
  }
  arg.$addToSet = {};
  arg.$addToSet[toPush] = userId;
  arg.$pull = {};
  arg.$pull[toPull] = userId;
  return arg;
};


/**
 * @return {Object} p .
 */
var swapUserId = function(itemId, userId, toPush, toPull) {
  var result = {};
  var itemRef;
  var hadUserInPush;
  var hadUserInPull;

  var pushInc;
  var pullInc;

  var q = findOne({
    id: itemId
  })
  .then(function(item) {
    itemRef = item;
    hadUserInPush = _.contains(item[toPush], userId);
    hadUserInPull = _.contains(item[toPull], userId);

    pushInc = hadUserInPush ? -1 : 1;
    pullInc = hadUserInPull ? -1 : 0;

    return update({
      id: itemId
    }, createSwapArg(userId, hadUserInPush, toPush, toPull));
  })
  .then(function(result) {
    assert.equal(result[0], 1); // numberAffected by update
    var wasPushed = pushInc > 0;
    return {
      wasPushed: wasPushed,
      wasOppositePulled: wasPushed && pullInc < 0,
      currentLike: toPush === 'nm_like' ? (itemRef.nm_like.length + pushInc) : (itemRef.nm_like.length + pullInc),
      currentBad: toPush === 'nm_bad' ? (itemRef.nm_bad.length + pushInc) : (itemRef.nm_bad.length + pullInc)
    };
  });
  return q;
};



// POST handlers
exports.like = function(req, res) {

  res.writeHead(200, {'Content-Type': 'application/json;charset=UTF8'});

  var itemId = req.params.itemId;
  var userId = req.session.twitter.id;
  swapUserId(itemId, userId, 'nm_like', 'nm_bad')
  .fail(whenFail(res))
  .done(function(result) {
    _.extend(result, {
      success: 1,
      message: 'Succeeded to push/pull.'
    });
    res.end(JSON.stringify(result));
  });

};



// POST handlers
exports.bad = function(req, res) {

  res.writeHead(200, {'Content-Type': 'application/json;charset=UTF8'});

  var itemId = req.params.itemId;
  var userId = req.session.twitter.id;
  swapUserId(itemId, userId, 'nm_bad', 'nm_like')
  .fail(whenFail(res))
  .done(function(result) {
    _.extend(result, {
      success: 1,
      message: 'Succeeded to push/pull.'
    });
    res.end(JSON.stringify(result));
  });

};



// Middleware.
exports.itemExistsMW = function(req, res, next) {

  var itemId = req.params.itemId;
  findOne({id: itemId})
  .fail(whenFail(res))
  .done(function(item) {
    !!item ? next(null, item) : res.end('not found');
  });

};
