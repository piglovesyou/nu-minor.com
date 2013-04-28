
var Q = require('q');
var youtube = require('youtube-feeds');
var assert = require('assert');

var db = require('../src/setupdb');
var http = require('../src/denodeify/http');
var count = Q.denodeify(db.item.count.bind(db.item));

describe('SoundCloudCollector', function() {

  it('should have all items saved in DB.', function(done) {
    var total;
    var soundcloud = require('../src/feedcollector/soundcloudcollector');
    Q.when()
    .then(soundcloud)
    .then(function() {
      return soundcloud.get('/users/piglovesyou.json');
    })
    .then(function(res) {
      total = res.json.track_count;
    })
    .then(function() { 
      return count({'nm_type': 'soundcloud'});
    })
    .then(function(actual) {
      console.log('total:', total, 'actual:', actual);
      assert.equal(total, actual)
      done();
    }).done();
  });

});
