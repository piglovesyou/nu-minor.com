
var Q = require('q');
var mongoose = require('mongoose');
var youtube = require('youtube-feeds');
var assert = require('assert');
var _ = require('underscore');

var db = require('../src/setupdb');
var count = Q.denodeify(db.item.count.bind(db.item));

describe('YoutubeCollector', function() {

  it('should have all items saved in DB.', function(done) {
    Q(require('../src/feedcollector/youtubecollector'))
    .then(function(total) {
      return count().then(function(actual) {
        return {
          total: total,
          actual: actual
        };
      });
    })
    .fail(function(err) {
      throw new Error(err);
    })
    .done(function(result) {
      console.log('total:', result.total, 'actual:', result.actual);
      assert.equal(result.total, result.actual);
      done();
    });
  });

});
