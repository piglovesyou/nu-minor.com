var Q = require('q');
var _ = require('underscore');
var youtube = require('youtube-feeds');
var assert = require('assert');
var db = require('../src/setupdb');
var http = require('../src/denodeify/http');
var count = Q.denodeify(db.item.count.bind(db.item));

describe('SoundCloudCollector', function() {
  return it('should have all items saved in DB.', function(done) {
    var soundcloud, total;
    total = void 0;
    soundcloud = require('../src/collector/soundcloud');
    return soundcloud.promise().then(function() {
      return soundcloud.get('/users/nu-minor/tracks.json');
    }).then(function(res) {
      var items = res.json;
      assert(_.isArray(items));
      return items;
    }).then(function(items) {
      return items.reduce(function(p, item) {
        return p.then(function() {
          return count({id: item.id});
        }).then(function(count) {
          console.log(count);
          assert.equal(count, 1);
        })
      }, Q());
    }).then(done);
  });
});

