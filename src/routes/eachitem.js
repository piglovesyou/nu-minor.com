
var Q = require('q');
var db = require('../setupdb');



var findOne = Q.denodeify(db.item.findOne.bind(db.item));
var update = Q.denodeify(db.item.update.bind(db.item));

var whenFail = function(res) {
  return function(reason) {
    res.end(JSON.stringify(reason));
  };
};



exports.view = function(req, res, item) {

  // var itemId = req.params.itemId;
  // findOne({id: itemId})
  // .fail(whenFail(res))
  // .done(function(item) {
  //   var body = item ? item.title : 'not found';
  //   res.end(body);
  // });

  res.end(JSON.stringify(item))
};



// POST handlers
exports.like = function(req, res) {
  var itemId = req.params.itemId;
  var userId = req.session.twitter.user_id;
  update({
    id: itemId
  })
  console.log(item.title);
}



exports.itemExistsMW = function(req, res, next) {
  
  var itemId = req.params.itemId;
  findOne({id: itemId})
  .fail(whenFail(res))
  .done(function(item) {
    console.log('====================');
    !!item ? next(null, item) : res.end('not found');
  })
}
