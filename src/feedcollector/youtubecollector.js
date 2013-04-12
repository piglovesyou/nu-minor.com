
var db = require('../setupdb');
var youtube = require('youtube-feeds');
var Q = require('q');

// A deferred object which is resolved when
// all step is done in this file.
var deferredToExport = Q.defer();

/** @type {Object} */
module.exports = deferredToExport.promise;

// A local promise object where steps are chained in this file.
var p;



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

// TODO: Refactor this.
var fetchItems = (function(page) {
  return function() {
    var d = Q.defer();
    youtube.feeds.videos(createOpt(page++), function(err, data) {
      if (err) d.reject(err);
      var p_ = Q.when();
      data.items.forEach(function(item) {
        p_.then(insertItem(item));
      });
      p_.fail(function(err) {
        d.reject(err);
      }).done(function(result) {
        if (!isEnough(data)) {
          // Fetch items again.
          p.then(fetchItems);
        } else {
          p.done(whenDone);
        }
        d.resolve(result);
      });
    });
    return d.promise;
  };
})(1); // 1 is first page.

var insertItem = function(item) {
  return function() {
    var d = Q.defer();
    db.post.update({ id: item.id },
                   item,
                   { upsert: true },
                   function(err, handled, status) {
      if (err) d.reject(err);
      d.resolve();
    });
    return d.promise;
  };
};

var whenDone = function() {
  deferredToExport.resolve();
};

p = Q.when()
.then(fetchItems)
.fail(function(err) {
  throw new Error(err);
});

