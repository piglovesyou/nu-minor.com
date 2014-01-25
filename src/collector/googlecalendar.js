
var Q = require('../moduleproxy/q');
var db = require('../db');
var querystring = require('querystring');
var http = require('../denodeify/http');
var API_KEY = require('secret-strings').NU_MINOR.API_KEY;

var update = Q.denodeify(db.item.update.bind(db.item));
var outError = require('../promise/promise').outError;



/** @type {Object} */
module.exports.promise = promise;



function promise() {
  return Q.when(createUrl())
  .then(get)
  .then(function(res) {
    return res.json.items;
  })
  .then(insertItems)
  .fail(outError);
}

function createUrl() {
  return 'https://www.googleapis.com/calendar/v3/calendars/' +
  'b225852svf6num52g7agnsh568@group.calendar.google.com' +
  '/events?' + querystring.stringify({
    alwaysIncludeEmail: false,
    key: API_KEY
  });
}

function get(url) {
  return http.sGet(url);
}

function insertItems(items) {
  return Q.allSettled(items.map(function(item, i) {
    item.nm_type = 'googlecalendar';
    return insertItem(item);
  }))
  .fail(outError);
}

function insertItem(item) {
  return update({ id: item.id },
    item, { upsert: true });
}

