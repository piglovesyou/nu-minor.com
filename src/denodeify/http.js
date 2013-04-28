
var Q = require('q');
var http = require('http');



module.exports.get = function(opt) {
  var d = Q.defer();
  http.get(opt, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk.toString();
    });
    res.on('end', function() {
      res.body = body;
      res.json = JSON.parse(body); // yeah
      d.resolve(res);
    });
  }).on('error', function(reason) {
    d.reject(reason);
  });
  return d.promise;
};
