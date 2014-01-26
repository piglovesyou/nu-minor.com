
var assert = require('assert');
var Q = require('../moduleproxy/q');
var http = require('../promise/http');
var outError = require('../promise/promise').outError;
var db = require('../promise/db');



module.exports.Base = Base;



function Base() {
  /** @type {string} */
  this.nmType;
  /** @type {string} */
  this.createdAtProperty = 'created_at';
}

Base.prototype.promise = function() {
  assert(this.nmType && this.createdAtProperty);
  return Q.when()
  .then(this.request.bind(this))
  .then(this.getItemsFromResponse.bind(this))
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
Base.prototype.request = function() {
  assert.fail('implement.');
};

/**
 * @private
 */
Base.prototype.insertItems_ = function(items) {
  var me = this;
  return Q.allSettled(items.map(function(item, i) {
    item.nm_type = me.nmType;
    item.created_at = item[me.createdAtProperty];
    return insertItem_(item);
  }))
  .fail(function(e) {
    console.log('------------------------');
  });
};

/**
 * @private
 */
function insertItem_(item) {
  return db.items.update({ id: item.id },
    item, { upsert: true });
}

