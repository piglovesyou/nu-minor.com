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
    id = undefined
    twitter = require("../src/feedcollector/twittercollector")
    Q.when().then(->
      twitter.promise
    ).then(->
      twitter.get "/search.json",
        q: "#DBZ"

    ).then((res) ->
      id = res.json.results[0].id
    ).then(->
      find
        nm_type: "twitter"
        id: "" + id

    ).then((item) ->
      assert _.isArray(item)
      assert item[0]
      assert.equal item[0].id, id
      done()
    ).done()


