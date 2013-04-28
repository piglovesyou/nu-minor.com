
var Q = require('q');
var youtube = require('youtube-feeds');
var assert = require('assert');
var _ = require('underscore');

var db = require('../src/setupdb');
var http = require('../src/denodeify/http');
var find = Q.denodeify(db.item.find.bind(db.item));
var count = Q.denodeify(db.item.count.bind(db.item));

describe('TwitterCollector', function() {

  it('should have some data in DB.', function(done) {
    var id;
    var twitter = require('../src/feedcollector/twittercollector');
    Q.when()
    .then(twitter)
    .then(function() {
      return twitter.get('/search.json', {
        q: '#DBZ'
      });
    })
    .then(function(res) {
      id = res.json.results[0].id;
    })
    .then(function() { 
      return find({'nm_type': 'twitter', id: '' + id});
    })
    .then(function(item) {
      assert(_.isArray(item));
      assert(item[0]);
      assert.equal(item[0].id, id)
      done();
    }).done();
  });

});
