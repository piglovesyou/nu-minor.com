
var db = require('../setupdb');
var youtube = require('youtube-feeds');
var Q = require('q');
var _ = require('underscore');

var update = Q.denodeify(db.item.update.bind(db.item));

// A deferred object which is resolved when
// all step is done in this file.
var deferredToExport = Q.defer();

/** @type {Object} */
module.exports = deferredToExport.promise;

// A local promise object where steps are chained in this file.
var promiseCollectYoutube;



// Constant and Helper Functions
var PER_PAGE = 50; // Youtube max spec.
var createOpt = function(pageIndex) {
  return {
    'author': 'cyriak',
    'max-results': PER_PAGE,
    // 1, 11, 21, 31 ...
    'start-index': ((pageIndex + 1) * PER_PAGE) - (PER_PAGE - 1)
  };
};

var whenFail = function(reason) {
  throw new Error(reason);
};

var whenAllDone = function(length) {
  deferredToExport.resolve(length);
};

var fetchRemote = function(pageIndex) {
  return function() {
    var d = Q.defer();
    youtube.feeds.videos(createOpt(pageIndex), function(err, data) {
      if (err) d.reject(err);
      d.resolve(data);
    });
    return d.promise;
  }
};

var fetchRestOfAll = function(data) {
  var d = Q.defer();

  var rest = data.totalItems - data.itemsPerPage;
  var times = Math.ceil(rest / PER_PAGE);
  var remotes = [];

  for (var i = 1; i <= times; i++) {
    remotes.push(fetchRemote(i));
  }
  Q.allResolved(remotes)
  .spread(function() {
    return data.items.concat(_.toArray(arguments));
  })
  .fail(whenFail)
  .done(function(items) {
    d.resolve(items);
  });

  return d.promise;
};

var insertItems = function(items) {
  var d = Q.defer();
  var p = Q.when();
  items.forEach(function(item) {
    item.nm_type = 'youtube';
    p.then(insertItem(item));
  });
  p.fail(whenFail)
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
.then(fetchRemote(0))
.then(fetchRestOfAll)
.then(insertItems)
.fail(whenFail)
.done(whenAllDone);
