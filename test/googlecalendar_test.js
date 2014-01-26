var Q = require('q');
var _ = require('underscore');
var assert = require('assert');
var db = require('../src/db');
var http = require('../src/promise/http');
var querystring = require('querystring');
var count = Q.denodeify(db.item.count.bind(db.item));
var API_KEY = require('secret-strings').NU_MINOR.API_KEY;

describe('GoogleCalendarCollector', function() {
  return it('should have all items saved in DB.', function(done) {
    var total = void 0;
    var googlecalendar = require('../src/collector/googlecalendar');
    return googlecalendar.promise().then(function() {
      return http.sGet(
        'https://www.googleapis.com/calendar/v3/calendars/' +
        'b225852svf6num52g7agnsh568@group.calendar.google.com' +
        '/events?' + querystring.stringify({
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
          return count({id: item.id});
        }).then(function(count) {
          assert.equal(count, 1);
        });
      }, Q());
    }).then(done);
  });
});

