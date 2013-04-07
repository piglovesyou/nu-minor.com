

var Q = require('q');
var db = require('../setupdb');

var collectYoutubeFeeds = function() {
  return require('./youtubecollector');
};






Q(collectYoutubeFeeds())

.then(function(items) {
  items.forEach(function(e, i) {
    console.log(i, e.uploaded, e.title);
  });
})

.fail(function(err) {
  throw new Error(err);
})

.done();

