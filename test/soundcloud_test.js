var Q = require('q');
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
      return soundcloud.get('/users/nu-minor.json');
    }).then(function(res) {
      return total = res.json.track_count;
    }).then(function() {
      return count({
        nm_type: 'soundcloud'
      });
    }).then(function(actual) {
      console.log('total:', total, 'actual:', actual);
      assert.equal(total, actual);
      return done();
    }).done();
  });
});

