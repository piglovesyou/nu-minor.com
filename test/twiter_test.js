var Q = require('q');
var youtube = require('youtube-feeds');
var assert = require('assert');
var _ = require('underscore');
var db = require('../src/db');
var http = require('../src/denodeify/http');
var find = Q.denodeify(db.item.find.bind(db.item));
var count = Q.denodeify(db.item.count.bind(db.item));

describe('TwitterCollector', function() {
  return it('should have some data in DB.', function(done) {
    var actualCount, twitter;
    actualCount = 0;
    twitter = require('../src/collector/twitter');
    return twitter.promise()
    .then(function() {
      return twitter.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=NU_minor');
    }).then(function(items) {
      assert(_.isArray(items));
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

