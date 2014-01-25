
var util = require('util');
var Base = require('./base').Base;
var Q = require('../moduleproxy/q');
var youtube = require('youtube-feeds');
var videos = Q.denodeify(youtube.feeds.videos.bind(youtube.feeds));



util.inherits(YouTube, Base);
module.exports = new YouTube();



function YouTube() {
  Base.call(this);
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

YouTube.prototype.getItemsFromResponse = function(data) {
  return data.items;
};

