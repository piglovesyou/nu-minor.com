
var Q = require('Q');
var db = require('../setupdb');

var findOne = Q.denodeify(db.item.findOne.bind(db.item));
var update = Q.denodeify(db.item.update.bind(db.item));

var whenFail = function(res) {
  return function(reason) {
    var o = {
      error: 1,
      reason: reason
    };
    res.end(JSON.stringify(o));
  }
};

exports.view = function(req, res) {
  var itemId = req.params.itemId;
  findOne({id: itemId}).fail(whenFail(res)).done(function(item) {
    res.end(item.title);
  });
};

exports.like = function(req, res) {
  var itemId = req.params.itemId;
  findOne({id: itemId})
  // .then(function(item) {
  // })
  .then(update.bind(null, {id: itemId}, {$inc: { like: 1}}))
  .fail(whenFail(res))
  .done(function() {
    res.end(itemId);
  });
};

exports.unlike = function(req, res) {
  res.end('yeah');
};
