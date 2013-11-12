
var Q = require('q');
var db = require('../setupdb');
var querystring = require('querystring');

// TODO: Make a module
var SECRET = require('secret-strings').NU_MINOR;
var oa = new (require('oauth').OAuth)(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    SECRET.CONSUMER_KEY,
    SECRET.CONSUMER_SECRET,
    '1.0A',
    null,
    'HMAC-SHA1');
var oauth_get = function(url) {
  var d = Q.defer();
  oa.get(url,
    SECRET.ACCESS_TOKEN,
    SECRET.ACCESS_TOKEN_SECRET,
    function(e, data, res) {
      if (e) d.reject(JSON.stringify(e));
      else d.resolve(JSON.parse(data));
    });
  return d.promise;
};

var http = require('../denodeify/http');
// var CLIENT_ID = require('secret-strings').NU_MINOR.SOUNDCLOUD_CLIENT_ID;

var update = Q.denodeify(db.item.update.bind(db.item));

var deferredToExport = Q.defer();

/** @type {Object} */
module.exports.promise = deferredToExport.promise;

// A local promise object where steps are chained in this file.
var promiseCollectYoutube;


var createUrl = function(path, param) {
  if (!param) param = {};
  return 'https://api.twitter.com' +
      path + '?' + querystring.stringify(param);
};

var get = function(url) {
  return oauth_get(url);
  // return http.get(createUrl(path, param));
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

