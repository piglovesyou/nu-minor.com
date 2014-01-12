
var db = require('../setupdb');
var youtube = require('youtube-feeds');
var Q = require('q');
Q.longStackSupport = true;
var _ = require('underscore');

var dbUpdate = Q.denodeify(db.item.update.bind(db.item));
var fetchYoutube = Q.denodeify(youtube.feeds.videos.bind(youtube.feeds));

// Youtube returns crazy response
var PER_PAGE = 20;



/** @type {Object} */
module.exports.promise = Q.when()
.then(fetchRemote.bind(null, 0, PER_PAGE))
.then(fetchRestOfAll)
.then(insertItems)
.fail(whenFail);



function fetchRemote(pageIndex, perPage) {
  return fetchYoutube(createOpt(pageIndex, perPage));
}

function whenFail(reason) {
  throw new Error(reason);
}

function fetchRestOfAll(data) {
  var firstItems = data.items;
  var remotes = [];
  var rest = data.totalItems - data.itemsPerPage;
  var i = 1;

  while (rest > 0) {
    var perPage = Math.min(rest, PER_PAGE); // fuck youtube api
    remotes.push(fetchRemote(i++, perPage));
    rest -= perPage;
  }

  return Q.allSettled(remotes)
  .spread(function() {
    return _.reduce(arguments, function(arr, data) {
      return arr.concat(data.items);
    }, firstItems);
  })
  .fail(whenFail);
}

function insertItem(item) {
  return dbUpdate({ id: item.id }, item, { upsert: true });
}

function insertItems(items) {
  return Q.allSettled(items.map(function(item, i) {
    item.nm_type = 'youtube';
    return insertItem(item);
  }))
  .fail(whenFail);
}

function createOpt(pageIndex, perPage) {
  return {
    'author': 'NUminormusic',
    'max-results': perPage,
    'start-index': pageIndex * PER_PAGE + 1
  };
}

