
var Q = require('q');
var http = require('http');
var https = require('https');



/***/
module.exports.get = get;
/***/
module.exports.sGet = sGet;

function get(opt) {
  return get_(http.get, opt);
}

function sGet(opt) {
  return get_(https.get, opt);
}

function get_(fn, opt) {
  var d = Q.defer();
  fn(opt, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk.toString();
    });
    res.on('end', function() {
      res.body = body;
      // TODO: Parse it outside.
      res.json = JSON.parse(body);
      d.resolve(res);
    });
  }).on('error', function(reason) {
    d.reject(reason);
  });
  return d.promise;
}

