var Q = require('q');
var _ = require('underscore');
var youtube = require('youtube-feeds');
var assert = require('assert');
var db = require('../src/db');
var http = require('../src/denodeify/http');
var count = Q.denodeify(db.item.count.bind(db.item));
var querystring = require('querystring');
var CLIENT_ID = require('secret-strings').NU_MINOR.SOUNDCLOUD_CLIENT_ID;

describe('SoundCloudCollector', function() {
  return it('should have all items saved in DB.', function(done) {
    var soundcloud, total;
    total = void 0;
    soundcloud = require('../src/collector/soundcloud');
    return soundcloud.promise().then(function() {
      return http.get(
        'http://api.soundcloud.com' +
        '/users/nu-minor/tracks.json?' +
        querystring.stringify({client_id: CLIENT_ID}));
    }).then(function(res) {
      var items = res.json;
      assert(_.isArray(items));
      return items;
    }).then(function(items) {
      return items.reduce(function(p, item) {
        return p.then(function() {
          return count({id: item.id});
        }).then(function(count) {
          assert.equal(count, 1);
        });
      }, Q());
    }).then(done);
  });
});
