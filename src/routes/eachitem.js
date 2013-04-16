
var Q = require('q');
var db = require('../setupdb');
var assert = require('assert');
var _ = require('underscore');



var findOne = Q.denodeify(db.item.findOne.bind(db.item));
var update = Q.denodeify(db.item.update.bind(db.item));

var whenFail = function(res) {
  return function(reason) {
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



// POST handlers
exports.like = function(req, res) {

  res.writeHead(200, {'Content-Type': 'application/json;charset=UTF8'});
  var itemId = req.params.itemId;
  var userId = req.session.twitter.user_id;
  var length;
  var usePush = null;
  var q = findOne({
    id: itemId
  })
  .then(function(item) {
    usePush = !_.contains(item.like, userId);
    length = item.like.length;
    assert(_.isNumber(length));
    var updateArg = usePush ? {
      $addToSet: { like: userId }
    } : {
      $pull: { like: userId }
    };
    return update({
      id: itemId
    }, updateArg);
  })
  .fail(whenFail(res))
  .done(function(numberAffected) {
    assert(!_.isNull(usePush));
    var resultJSON = !!numberAffected ? {
      success: 1,
      userLiked: usePush ? 1 : 0,
      currentLike: usePush ? ++length : --length,
      message: 'Succeeded to push/pull.'
    } : {
      error: 1,
      reason: 'something wrong.'
    };
    res.end(JSON.stringify(resultJSON));
  });

};



// Middleware.
exports.itemExistsMW = function(req, res, next) {

  var itemId = req.params.itemId;
  findOne({id: itemId})
  .fail(whenFail(res))
  .done(function(item) {
    console.log('====================');
    !!item ? next(null, item) : res.end('not found');
  });

};
