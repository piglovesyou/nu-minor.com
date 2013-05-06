Q = require("q")
youtube = require("youtube-feeds")
assert = require("assert")
db = require("../src/setupdb")
count = Q.denodeify(db.item.count.bind(db.item))
videos = Q.denodeify(youtube.feeds.videos.bind(youtube.feeds))
describe "YoutubeCollector", ->
  it "should have all items saved in DB.", (done) ->
    total = undefined
    Q.when().then(->
      require("../src/feedcollector/youtubecollector").promise
    ).fail((err) ->
      throw new Error(err)
    ).then(->
      videos
        author: "cyriak"
        "max-results": 1

    ).then((data) ->
      total = data.totalItems
      count nm_type: "youtube"
    ).done (actual) ->
      console.log "total:", total, "actual:", actual
      assert.equal total, actual
      done()



