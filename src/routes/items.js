
var Q = require('../moduleproxy/q');
var outError = require('../promise/promise');
var db = require('../promise/db');
var assert = require('assert');
var _ = require('underscore');

var whenFail = function(res) {
  return function(reason) {
    assert.fail(reason);
    res.end(JSON.stringify(reason));
  };
};



exports.view = function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json;charset=UTF8'});

  var userId = req.params.userId;

  db.users.findOne({id: userId}, {_id: 0})
  .fail(whenFail(res))
  .then(function(user) {
    res.end(JSON.stringify(user));
  });
  
};


exports.userExistsMW = function(req, res, next) {

  var userId = req.params.userId;
  db.users.findOne({id: userId})
  .fail(whenFail(res))
  .then(function(user) {
    !!user ? next(null, user) : res.end('not found');
  });

};
