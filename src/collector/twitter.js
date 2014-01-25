

var util = require('util');
var Base = require('./base').Base;
var twitter = require('../auth/twitter');



util.inherits(Twitter, Base);
module.exports = new Twitter();



function Twitter() {
  Base.call(this);
  this.nmType = 'twitter';
}

Twitter.prototype.request = function() {
  return twitter.get(
      'https://api.twitter.com/1.1/statuses/user_timeline.json?' +
      'screen_name=NU_minor');
};

Twitter.prototype.getItemsFromResponse = function(data) {
  return data;
};
