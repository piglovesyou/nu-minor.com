var Q = require('q');
var _ = require('underscore');
var assert = require('assert');
var db = require('../src/promise/db');
var http = require('../src/promise/http');
var querystring = require('querystring');
var API_KEY = require('secret-strings').NU_MINOR.API_KEY;
var CALENDAR_ID = require('secret-strings').NU_MINOR.CALENDAR_ID;

describe('GoogleCalendarCollector', function() {
  return it('should have all items saved in DB.', function(done) {
    return require('../src/collector/googlecalendar').promise()
    .then(function() {
      return http.sGet(
        'https://www.googleapis.com/calendar/v3/calendars/' +
        CALENDAR_ID + '/events?' + querystring.stringify({
          alwaysIncludeEmail: false,
          key: API_KEY
        }));
    }).then(function(res) {
      var items = res.json.items;
      assert(_.isArray(items));
      return items;
    }).then(function(items) {
      return items.reduce(function(p, item) {
        return p.then(function() {
          return db.items.count({id: item.id});
        }).then(function(count) {
          assert.equal(count, 1);
        });
      }, Q());
    }).then(done);
  });
});

