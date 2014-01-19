(function() {
  var Q, assert, count, db, find, http, youtube, _;

  Q = require("q");

  youtube = require("youtube-feeds");

  assert = require("assert");

  _ = require("underscore");

  db = require("../src/setupdb");

  http = require("../src/denodeify/http");

  find = Q.denodeify(db.item.find.bind(db.item));

  count = Q.denodeify(db.item.count.bind(db.item));

  describe("TwitterCollector", function() {
    return it("should have some data in DB.", function(done) {
      var actualCount, twitter;
      actualCount = 0;
      twitter = require("../src/collector/twitter");
      return twitter.promise().then(function() {
        return twitter.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=NU_minor");
      }).then(function(items) {
        actualCount = items.length;
        return find({
          nm_type: "twitter"
        });
      }).then(function(dbItems) {
        assert(_.isArray(dbItems));
        assert.equal(dbItems.length, actualCount);
        return done();
      }).done();
    });
  });

}).call(this);
