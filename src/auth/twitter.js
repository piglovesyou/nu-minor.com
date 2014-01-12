var Q = require('q');



/** 
 * @type {Object}
 * @return {Object} promise .
 */
module.exports.get = oauth_get;



var SECRET = require('secret-strings').NU_MINOR;
var oa = new (require('oauth').OAuth)(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    SECRET.CONSUMER_KEY,
    SECRET.CONSUMER_SECRET,
    '1.0A',
    null,
    'HMAC-SHA1');
function oauth_get(url) {
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
