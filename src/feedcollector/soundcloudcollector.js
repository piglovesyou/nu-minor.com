
var Q = require('q');
var db = require('../setupdb');
var querystring = require('querystring');
var http = require('../denodeify/http');
var CLIENT_ID = require('secret-strings').NU_MINOR.SOUNDCLOUD_CLIENT_ID;

var update = Q.denodeify(db.item.update.bind(db.item));

var deferredToExport = Q.defer();

/** @type {Object} */
module.exports.promise = deferredToExport.promise;

// A local promise object where steps are chained in this file.
var promiseCollectYoutube;


var createUrl = function(path, param) {
  if (!param) param = {};
  param.client_id = CLIENT_ID;
  return 'http://api.soundcloud.com' +
      path + '?' + querystring.stringify(param);
};

var get = function(path) {
  return http.get(createUrl(path));
};
module.exports.get = get;

var whenFail = function(reason) {
  throw new Error(reason);
};

var whenAllDone = function(length) {
  deferredToExport.resolve(length);
};

var insertItem = function(item) {
  return update({ id: item.id },
    item, { upsert: true });
};

var insertItems = function(items) {

  var d = Q.defer();
  Q.allResolved(items.map(function(item, i) {
    item.nm_type = 'soundcloud';
    return insertItem(item);
  }))
  .fail(whenFail)
  .done(function() {
    d.resolve(items.length);
  });
  return d.promise;
};


promiseCollectYoutube = Q.when()
.then(function() {
  return get('/users/piglovesyou/tracks.json');
})
.then(function(res) {
  return res.json;
})
.then(insertItems)
.fail(whenFail)
.done(whenAllDone);
