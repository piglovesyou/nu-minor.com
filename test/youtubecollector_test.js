
var Q = require('q');
var mongoose = require('mongoose');
var youtube = require('youtube-feeds');
var assert = require('assert');
var _ = require('underscore');

var db = require('../src/setupdb');

describe('YoutubeCollector', function() {

  it('should have all items saved in DB.', function(done) {
    Q(require('../src/feedcollector/youtubecollector'))
    .then(function() {
      var d = Q.defer();
      youtube.feeds.videos({
        'author': 'cyriak',
        'max-results': 1 
      }, function(err, data) {
        assert(_.isNumber(data.totalItems));
        d.resolve(data.totalItems);
      });
      return d.promise;
    })
    .then(function(total) {
      var d = Q.defer();
      db.item.count(function(err, actual) {
        assert(_.isNumber(actual));
        d.resolve({
          total: total,
          actual: actual
        });
      });
      return d.promise;
    })
    .fail(function(err) {
      throw new Error(err);
    })
    .done(function(result) {
      console.log(result.total, result.actual);
      assert.equal(result.total, result.actual);
      done();
    });
  });

});
