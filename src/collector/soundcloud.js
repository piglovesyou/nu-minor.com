
var querystring = require('querystring');
var util = require('util');
var CLIENT_ID = require('secret-strings').NU_MINOR.SOUNDCLOUD_CLIENT_ID;
var Base = require('./base').Base;



util.inherits(SoundCloud, Base);
module.exports = new SoundCloud();



function SoundCloud() {
  this.nmType = 'soundcloud';
  this.url =
    'http://api.soundcloud.com' +
    '/users/nu-minor/tracks.json?' +
    querystring.stringify({client_id: CLIENT_ID});
}

SoundCloud.prototype.getItemsFromJson = function(res) {
  return res.json;
};

