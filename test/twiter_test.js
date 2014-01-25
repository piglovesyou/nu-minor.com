var Q = require('q');
var youtube = require('youtube-feeds');
var assert = require('assert');
var _ = require('underscore');
var db = require('../src/db');
var http = require('../src/denodeify/http');
var find = Q.denodeify(db.item.find.bind(db.item));
var count = Q.denodeify(db.item.count.bind(db.item));
var twitter = require('../src/auth/twitter');

describe('TwitterCollector', function() {
  return it('should have some data in DB.', function(done) {
    return require('../src/collector/twitter').promise()
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

