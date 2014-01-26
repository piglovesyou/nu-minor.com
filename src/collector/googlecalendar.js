var util = require('util');
var querystring = require('querystring');
var Q = require('../moduleproxy/q');
var Base = require('./base').Base;
var http = require('../promise/http');
var API_KEY = require('secret-strings').NU_MINOR.API_KEY;
var CALENDAR_ID = require('secret-strings').NU_MINOR.CALENDAR_ID;
var db = require('../promise/db');



util.inherits(GoogleCalendar, Base);
module.exports = new GoogleCalendar();



function GoogleCalendar() {
  Base.call(this);
  this.nmType = 'googlecalendar';
  this.createdAtProperty = 'created';
}

GoogleCalendar.prototype.request = function() {
  return http.sGet('https://www.googleapis.com/calendar/v3/calendars/' +
    CALENDAR_ID + '/events?' + querystring.stringify({
      alwaysIncludeEmail: false,
      showDeleted: true,
      key: API_KEY
    }));
};

GoogleCalendar.prototype.getItemsFromResponse = function(res) {
  var items =  res.json.items.filter(function(item) {
    // If 'cancelled', remove it from db.
    if (item.status == 'cancelled') {
      db.items.findOneAndRemove({ id: item.id });
      return false
    }
    return true;
  });
  return items;
};

