
var db = require('../setupdb');
var youtube = require('youtube-feeds');
var Q = require('q');
var _ = require('underscore');

var update = Q.denodeify(db.item.update.bind(db.item));

var deferredToExport = Q.defer();

/** @type {Object} */
module.exports = deferredToExport.promise;

// A local promise object where steps are chained in this file.
var promiseCollectYoutube;



// Youtube returns crazy response
var PER_PAGE = 20; // Youtube max spec.
var createOpt = function(pageIndex, perPage) {
  return {
    'author': 'cyriak',
    'max-results': perPage,
    // 1, 11, 21, 31 ...
    'start-index': pageIndex * PER_PAGE + 1
  };
};

var whenFail = function(reason) {
  throw new Error(reason);
};

var whenAllDone = function(length) {
  deferredToExport.resolve(length);
};

var fetchRemote = function(pageIndex, perPage) {
  return function() {
    var d = Q.defer();
    var o = createOpt(pageIndex, perPage);
    youtube.feeds.videos(o, function(err, data) {
      if (err) d.reject(err);
      d.resolve(data);
    });
    return d.promise;
  }
};

var fetchRestOfAll = function(data) {
  var d = Q.defer();

  var items = data.items;
  var rest = data.totalItems - data.itemsPerPage;
  var remotes = [];
  var i = 1;

  while (rest > 0) {
    var perPage = Math.min(rest, PER_PAGE); // fuck youtube api
    remotes.push(fetchRemote(i++, perPage)());
    rest -= perPage;
  }

  Q.allResolved(remotes)
  .spread(function() {
    _.each(arguments, function(data) {
      items = items.concat(data.items);
    })
    return;
  })
  .fail(whenFail)
  .done(function() {
    d.resolve(items);
  });

  return d.promise;
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

var insertItem = function(item) {
  return update({ id: item.id },
    item, { upsert: true });
};



promiseCollectYoutube = Q.when()
.then(fetchRemote(0, PER_PAGE))
.then(fetchRestOfAll)
.then(insertItems)
.fail(whenFail)
.done(whenAllDone);
