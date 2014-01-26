
var Q = require('q');
var db = require('../promise/db');
var assert = require('assert');
var _ = require('underscore');
var outError = require('../promise/promise').outError;



// GET handlers
exports.view = function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json;charset=UTF8'});
  db.items.findOne({id: req.params.itemId}, {_id: 0})
  .fail(outError)
  .then(function(item) {
    res.end(JSON.stringify(item));
  });
};

