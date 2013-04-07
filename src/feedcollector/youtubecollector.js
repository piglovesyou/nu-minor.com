
var db = require('../setupdb');
var youtube = require('youtube-feeds');
var Q = require('q');

var deferredToExport = Q.defer();

var collectFromDB = function() {
  return Q.nbind(db.Item.find, db.Item)();
};

var get25Items = function(itemsFromDB) {
  if (itemsFromDB && itemsFromDB.length >= 25) {
    return itemsFromDB;
  }
  var d = Q.defer();
  youtube.feeds.videos({
    author: 'cyriak'
  }, function(err, data) {
    if (err) d.reject(err);
    saveItems(data.items);
    d.resolve(data.items);
  });
  return d.promise;
};

var saveItems = function(items) {
  items.forEach(function(item) {
    db.Item.update({
      id: item.id
    }, item, {
      upsert: true
    }, true); // To update without callback
  });
};

var sortByUploadedDate = function(items) {
  return items.sort(function(a, b) {
    return a.uploaded < b.uploaded ? -1 :
           a.uploaded > b.uploaded ? 1 : 0 ;
  });
}






Q.when(collectFromDB())

.then(get25Items)

.then(sortByUploadedDate)

.then(function(items) {
  deferredToExport.resolve(items);
})

.fail(function(err) {
  deferredToExport.reject(err);
});

module.exports = deferredToExport.promise;
