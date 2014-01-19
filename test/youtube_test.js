var Q = require('q');
var youtube = require('youtube-feeds');
var assert = require('assert');
var db = require('../src/setupdb');
var count = Q.denodeify(db.item.count.bind(db.item));
var videos = Q.denodeify(youtube.feeds.videos.bind(youtube.feeds));
var outError = require('../src/promise/promise').outError;

describe('YoutubeCollector', function() {
  return it('should have all items saved in DB.', function(done) {
    var total;
    total = void 0;
    return require('../src/collector/youtube').promise().then(function() {
      return videos({
        author: 'NUminormusic',
        'max-results': 1
      });
    }).then(function(data) {
      total = data.totalItems;
      return count({
        nm_type: 'youtube'
      });
    }).done(function(actual) {
      console.log('total:', total, 'actual:', actual);
      assert.equal(total, actual);
      return done();
    });
  });
});

