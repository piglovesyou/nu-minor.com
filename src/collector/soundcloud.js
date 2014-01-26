
var util = require('util');
var querystring = require('querystring');
var http = require('../promise/http');
var CLIENT_ID = require('secret-strings').NU_MINOR.SOUNDCLOUD_CLIENT_ID;
var Base = require('./base').Base;



util.inherits(SoundCloud, Base);
module.exports = new SoundCloud();



function SoundCloud() {
  Base.call(this);
  this.nmType = 'soundcloud';
}

SoundCloud.prototype.request = function() {
  return http.get('http://api.soundcloud.com' +
    '/users/nu-minor/tracks.json?' +
    querystring.stringify({client_id: CLIENT_ID}));
};

SoundCloud.prototype.getItemsFromResponse = function(res) {
  return res.json;
};

