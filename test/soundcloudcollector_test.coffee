Q = require("q")
youtube = require("youtube-feeds")
assert = require("assert")
db = require("../src/setupdb")
http = require("../src/denodeify/http")
count = Q.denodeify(db.item.count.bind(db.item))
describe "SoundCloudCollector", ->
  it "should have all items saved in DB.", (done) ->
    total = undefined
    soundcloud = require("../src/collector/soundcloudcollector")
    Q.when().then(->
      soundcloud.promise
    ).then(->
      soundcloud.get "/users/nu-minor.json"
    ).then((res) ->
      total = res.json.track_count
    ).then(->
      count nm_type: "soundcloud"
    ).then((actual) ->
      console.log "total:", total, "actual:", actual
      assert.equal total, actual
      done()
    ).done()


