
var Q = require('q');
var db = require('../setupdb');
var querystring = require('querystring');
var twitter = require('../auth/twitter');

var http = require('../denodeify/http');
// var CLIENT_ID = require('secret-strings').NU_MINOR.SOUNDCLOUD_CLIENT_ID;

var update = Q.denodeify(db.item.update.bind(db.item));

var deferredToExport = Q.defer();

/** @type {Object} */
module.exports.promise = deferredToExport.promise;

// A local promise object where steps are chained in this file.
var promiseCollectYoutube;


function createUrl(path, param) {
  if (!param) param = {};
  return 'https://api.twitter.com' +
      path + '?' + querystring.stringify(param);
};

function get(url) {
  return twitter.get(url);
};
module.exports.get = get;

function whenFail(reason) {
  throw new Error(reason);
};

function whenAllDone(length) {
  deferredToExport.resolve(length);
};

function insertItem(item) {
  return update({ id: item.id }, item, { upsert: true });
};

function insertItems(items) {
  var d = Q.defer();
  Q.allSettled(items.map(function(item, i) {
    item.nm_type = 'twitter';
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
  return get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=NU_minor');
})
.then(insertItems)
.fail(whenFail)
.done(whenAllDone);

