

var Q = require('q');

var collectYoutubeFeeds = function() {
  return require('./youtubecollector');
};






Q(collectYoutubeFeeds())

.fail(function(err) {
  throw new Error(err);
})

.done(function() {
  // console.log('------- all done.');
});

