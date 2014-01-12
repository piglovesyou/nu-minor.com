Q = require("q")
youtube = require("youtube-feeds")
assert = require("assert")
db = require("../src/setupdb")
count = Q.denodeify(db.item.count.bind(db.item))
videos = Q.denodeify(youtube.feeds.videos.bind(youtube.feeds))
outError = require('../src/promise/promise').outError



describe "YoutubeCollector", ->
  it "should have all items saved in DB.", (done) ->
    total = undefined

    require("../src/collector/youtube").promise()
    .then(->
      videos
        author: "NUminormusic"
        "max-results": 1

    ).then((data) ->
      total = data.totalItems
      count nm_type: "youtube"
    ).done (actual) ->
      console.log "total:", total, "actual:", actual
      assert.equal total, actual
      done()



