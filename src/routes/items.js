
var Q = require('../moduleproxy/q');
var outError = require('../promise/promise');
var db = require('../promise/db');
var assert = require('assert');
var _ = require('underscore');
var outError = require('../promise/promise').outError;



exports.view = function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json;charset=UTF8'});
  var userId = req.params.userId;
  db.users.findOne({id: userId}, {_id: 0})
  .fail(outError)
  .then(function(user) {
    res.end(JSON.stringify(user));
  });
};

