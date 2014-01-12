
var Q = require('../moduleproxy/q');
var db = require('../setupdb');
var querystring = require('querystring');
var http = require('../denodeify/http');
var CLIENT_ID = require('secret-strings').NU_MINOR.SOUNDCLOUD_CLIENT_ID;

var update = Q.denodeify(db.item.update.bind(db.item));
var outError = require('../promise/promise').outError;



/** @type {Object} */
module.exports.promise = promise;
module.exports.get = get;



function promise() {
  return Q.when('/users/nu-minor/tracks.json')
  .then(get)
  .then(function(res) {
    return res.json;
  })
  .then(insertItems)
  .fail(outError);
}

function get(path) {
  return http.get(createUrl(path));
}

function insertItems(items) {
  return Q.allSettled(items.map(function(item, i) {
    item.nm_type = 'soundcloud';
    return insertItem(item);
  }))
  .then(function() {
    return items.length;
  })
  .fail(outError);
}

function insertItem(item) {
  return update({ id: item.id },
    item, { upsert: true });
}

function createUrl(path, param) {
  if (!param) param = {};
  param.client_id = CLIENT_ID;
  return 'http://api.soundcloud.com' +
      path + '?' + querystring.stringify(param);
}

