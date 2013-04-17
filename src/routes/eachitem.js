
var Q = require('q');
var db = require('../setupdb');
var assert = require('assert');
var _ = require('underscore');



var findOne = Q.denodeify(db.item.findOne.bind(db.item));
var update = Q.denodeify(db.item.update.bind(db.item));

var whenFail = function(res) {
  return function(reason) {
    assert.fail(reason);
    res.end(JSON.stringify(reason));
  };
};



// GET handlers
exports.view = function(req, res, item) {

  var itemId = req.params.itemId;
  findOne({id: itemId})
  .fail(whenFail(res))
  .done(function(item) {
    var body = item ? item.title : 'not found';
    res.end(body);
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
      currentLike: toPush === 'like' ? (itemRef.like.length + pushInc) : (itemRef.like.length + pullInc),
      currentBad: toPush === 'bad' ? (itemRef.bad.length + pushInc) : (itemRef.bad.length + pullInc)
    };
  });
  return q; 
};



// POST handlers
exports.like = function(req, res) {

  res.writeHead(200, {'Content-Type': 'application/json;charset=UTF8'});

  var itemId = req.params.itemId;
  var userId = req.session.twitter.user_id;
  swapUserId(itemId, userId, 'like', 'bad')
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
  var userId = req.session.twitter.user_id;
  swapUserId(itemId, userId, 'bad', 'like')
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
