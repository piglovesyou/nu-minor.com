var util = require('util');
var querystring = require('querystring');
var Base = require('./base').Base;
var http = require('../denodeify/http');
var API_KEY = require('secret-strings').NU_MINOR.API_KEY;



util.inherits(GoogleCalendar, Base);
module.exports = new GoogleCalendar();



function GoogleCalendar() {
  Base.call(this);
  this.nmType = 'googlecalendar';
  this.createdAtProperty = 'created';
}

GoogleCalendar.prototype.request = function() {
  return http.sGet('https://www.googleapis.com/calendar/v3/calendars/' +
    'b225852svf6num52g7agnsh568@group.calendar.google.com' +
    '/events?' + querystring.stringify({
      alwaysIncludeEmail: false,
      key: API_KEY
    }));
};

GoogleCalendar.prototype.getItemsFromResponse = function(res) {
  return res.json.items;
};
