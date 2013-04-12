
var db = require('../setupdb');
var youtube = require('youtube-feeds');
var Q = require('q');

// A deferred object which is resolved when
// all step is done in this file.
var deferredToExport = Q.defer();

/** @type {Object} */
module.exports = deferredToExport.promise;

// A local promise object where steps are chained in this file.
var promiseCollectYoutube;



// Constant and Helper Functions
var MAX_RESULTS = 50; // Youtube max spec.
var createOpt = function(page) {
  return {
    'author': 'cyriak',
    'max-results': MAX_RESULTS,
    // 1, 11, 21, 31 ...
    'start-index': (page * MAX_RESULTS) - (MAX_RESULTS - 1)
  };
};

var isEnough = function(data) {
  return data.startIndex + data.items.length > data.totalItems;
};

var whenFail = function(reason) {
  throw new Error(reason);
};

var whenAllDone = function() {
  deferredToExport.resolve();
};



// Primary Step
var fetchItems = (function(page) {
  return function() {
    var d = Q.defer();
    Q.when()
    .then(fetchRemote(page++))
    .then(insertItems)
    .fail(whenFail)
    .done(function() {
      d.resolve();
    });
    return d.promise;
  };
})(1); // 1 is first page.




// Sub Steps
var fetchRemote = function(page) {
  return function() {
    var d = Q.defer();
    youtube.feeds.videos(createOpt(page), function(err, data) {
      if (err) d.reject(err);
      d.resolve(data);
    });
    return d.promise;
  }
};

var insertItems = function(data) {
  var d = Q.defer();
  var p = Q.when();
  data.items.forEach(function(item) {
    item.type = 'youtube';
    p.then(insertItem(item));
  });
  p.fail(whenFail)
  .done(function() {
    if (!isEnough(data)) {
      // Fetch items again.
      promiseCollectYoutube.then(fetchItems);
    } else {
      promiseCollectYoutube.done(whenAllDone);
    }
    d.resolve();
  });
  return d.promise;
};

var insertItem = function(item) {
  return function() {
    var d = Q.defer();
    db.item.update({ id: item.id },
                   item,
                   { upsert: true },
                   function(err, handled, status) {
      if (err) d.reject(err);
      d.resolve();
    });
    return d.promise;
  };
};



promiseCollectYoutube = Q.when()
.then(fetchItems)
.fail(whenFail);
