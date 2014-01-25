
var querystring = require('querystring');
var util = require('util');
var CLIENT_ID = require('secret-strings').NU_MINOR.SOUNDCLOUD_CLIENT_ID;
var Base = require('./base').Base;

var Q = require('../moduleproxy/q');
var youtube = require('youtube-feeds');
var videos = Q.denodeify(youtube.feeds.videos.bind(youtube.feeds));



util.inherits(YouTube, Base);
module.exports = new YouTube();



function YouTube() {
  this.nmType = 'youtube';
  this.createdAtProperty = 'uploaded';
}

YouTube.prototype.request = function() {
  return videos({
    'author': 'NUminormusic',
    'max-results': 20,
    'start-index': 1 // It starts from 1..
  });
};

YouTube.prototype.getItemsFromJson = function(data) {
  return data.items;
};

