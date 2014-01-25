
var Q = require('../moduleproxy/q');
var outError = require('../promise/promise');
var db = require('../db');
var assert = require('assert');
var _ = require('underscore');

var findUser = Q.denodeify(db.user.findOne.bind(db.user));

var whenFail = function(res) {
  return function(reason) {
    assert.fail(reason);
    res.end(JSON.stringify(reason));
  };
};



exports.view = function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json;charset=UTF8'});

  var userId = req.params.userId;

  findUser({id: userId}, {_id: 0})
  .fail(whenFail(res))
  .then(function(user) {
    res.end(JSON.stringify(user));
  });
  
};


exports.userExistsMW = function(req, res, next) {

  var userId = req.params.userId;
  findUser({id: userId})
  .fail(whenFail(res))
  .then(function(user) {
    !!user ? next(null, user) : res.end('not found');
  });

};
