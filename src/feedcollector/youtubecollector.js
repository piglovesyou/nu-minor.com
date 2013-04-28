
var db = require('../setupdb');
var youtube = require('youtube-feeds');
var Q = require('q');
var _ = require('underscore');

var update = Q.denodeify(db.item.update.bind(db.item));
var videos = Q.denodeify(youtube.feeds.videos.bind(youtube.feeds));

var deferredToExport = Q.defer();

/** @type {Object} */
module.exports = deferredToExport.promise;

// A local promise object where steps are chained in this file.
var promiseCollectYoutube;



// Youtube returns crazy response
var PER_PAGE = 20;
var createOpt = function(pageIndex, perPage) {
  return {
    'author': 'cyriak',
    'max-results': perPage,
    'start-index': pageIndex * PER_PAGE + 1
  };
};

var fetchRemote = function(pageIndex, perPage) {
  return videos(createOpt(pageIndex, perPage));
};

var whenFail = function(reason) {
  throw new Error(reason);
};

var whenAllDone = function(length) {
  deferredToExport.resolve(length);
};

var fetchRestOfAll = function(data) {
  var d = Q.defer();

  var firstItems = data.items;
  var remotes = [];
  var rest = data.totalItems - data.itemsPerPage;
  var i = 1;

  while (rest > 0) {
    var perPage = Math.min(rest, PER_PAGE); // fuck youtube api
    remotes.push(fetchRemote(i++, perPage));
    rest -= perPage;
  }

  Q.allResolved(remotes)
  .spread(function() {
    return _.reduce(arguments, function(arr, data) {
      return arr.concat(data.items);
    }, firstItems);
  })
  .fail(whenFail)
  .done(function(items) {
    d.resolve(items);
  });

  return d.promise;
};

var insertItem = function(item) {
  return update({ id: item.id },
    item, { upsert: true });
};

var insertItems = function(items) {
  var d = Q.defer();
  Q.allResolved(items.map(function(item, i) {
    item.nm_type = 'youtube';
    return insertItem(item);
  }))
  .fail(whenFail)
  .done(function() {
    d.resolve(items.length);
  });
  return d.promise;
};



promiseCollectYoutube = Q.when()
.then(fetchRemote.bind(null, 0, PER_PAGE))
.then(fetchRestOfAll)
.then(insertItems)
.fail(whenFail)
.done(whenAllDone);
