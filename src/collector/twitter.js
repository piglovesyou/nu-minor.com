
var Q = require('../moduleproxy/q');
var db = require('../setupdb');
var querystring = require('querystring');
var twitter = require('../auth/twitter');

var http = require('../denodeify/http');
// var CLIENT_ID = require('secret-strings').NU_MINOR.SOUNDCLOUD_CLIENT_ID;

var dbUpdate = Q.denodeify(db.item.update.bind(db.item));
var outError = require('../promise/promise').outError;



/** @type {Object} */
module.exports.promise = promise;
/** @type {Object} */
module.exports.get = get;



function promise() {
  return Q.when(
    'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=NU_minor')
  .then(get)
  .then(insertItems)
  .fail(outError);
}

function get(url) {
  return twitter.get(url);
}

function insertItem(item) {
  console.log(item.id);
  return dbUpdate({ id: item.id }, item, { upsert: true });
}

function insertItems(items) {
  return Q.allSettled(items.map(function(item, i) {
    item.nm_type = 'twitter';
    return insertItem(item);
  }))
  .fail(outError);
}

function createUrl(path, param) {
  if (!param) param = {};
  return 'https://api.twitter.com' +
      path + '?' + querystring.stringify(param);
}

