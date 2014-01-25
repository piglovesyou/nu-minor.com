
var assert = require('assert');
var Q = require('../moduleproxy/q');
var db = require('../db');
var update = Q.denodeify(db.item.update.bind(db.item));
var http = require('../denodeify/http');
var outError = require('../promise/promise').outError;



module.exports.Base = Base;



function Base() {
  /** @type {string} */
  this.nmType;
  /** @type {string} */
  this.url;
}

Base.prototype.promise = function() {
  assert(this.nmType && this.url);
  return Q.when(this.url)
  .then(this.request.bind(this))
  .then(this.getItemsFromJson.bind(this))
  .then(this.insertItems_.bind(this))
  .fail(outError);
};

/**
 * @protected
 */
Base.prototype.getItemsFromResponse = function(res) {
  assert.fail('implement.');
};

/**
 * @protected
 */
Base.prototype.request = function(url) {
  return http.get(url);
};

/**
 * @private
 */
Base.prototype.insertItems_ = function(items) {
  return Q.allSettled(items.map(function(item, i) {
    item.nm_type = this.nmType;
    return insertItem_(item);
  }))
  .fail(outError);
};

/**
 * @private
 */
function insertItem_(item) {
  return update({ id: item.id },
    item, { upsert: true });
}

