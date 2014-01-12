Q = require("q")
youtube = require("youtube-feeds")
assert = require("assert")
_ = require("underscore")
db = require("../src/setupdb")
http = require("../src/denodeify/http")
find = Q.denodeify(db.item.find.bind(db.item))
count = Q.denodeify(db.item.count.bind(db.item))



describe "TwitterCollector", ->
  it "should have some data in DB.", (done) ->
    actualCount = 0
    twitter = require("../src/collector/twitter")
    twitter.promise()
    .then(->
      twitter.get "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=NU_minor"

    ).then((items)->
      actualCount = items.length
      find
        nm_type: "twitter"

    ).then((dbItems) ->
      assert _.isArray(dbItems)
      assert.equal dbItems.length, actualCount
      done()
    ).done()

