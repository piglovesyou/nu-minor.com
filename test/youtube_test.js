var Q = require('q');
var youtube = require('youtube-feeds');
var assert = require('assert');
var _ = require('underscore');
var db = require('../src/promise/db');
var videos = Q.denodeify(youtube.feeds.videos.bind(youtube.feeds));
var outError = require('../src/promise/promise').outError;

describe('YoutubeCollector', function() {
  return it('should have all items saved in DB.', function(done) {
    return require('../src/collector/youtube').promise().then(function() {
      return videos({
        author: 'NUminormusic'
      });
    }).then(function(data) {
      var items = data.items;
      assert(_.isArray(items));
      return items.reduce(function(p, item) {
        return p.then(function() {
          return db.items.count({id: item.id});
        }).then(function(count) {
          assert.equal(count, 1);
        });
      }, Q());
    }).then(done);
  });
});

