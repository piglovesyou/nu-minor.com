
var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/numinor');
var _ = require('underscore');


var schemaMap = {};
var modelMap = {};


var youtube = {
  id: String,
  title: String,
  uploaded: String,
  updated: String,
  uploader: String,
  category: String,
  description: String,
  thumbnail: Object,
  player: Object,
  content: Object,
  duration: Number,
  aspectRatio: String,
  rating: Number,
  likeCount: String,
  ratingCount: Number,
  viewCount: Number,
  favoriteCount: Number,
  commentCount: Number,
  accessControl: Object
};



schemaMap.post = _.extend(youtube, {
  type: String, // youtube
  like: [ String ],
  unlike: [ String ]
});



// Initialize models and export them
_.each(schemaMap, function(schema, name) {
  try {
    modelMap[name] = mongoose.model(name, schema) 
  } catch (e) {
    modelMap[name] = mongoose.model(name) 
  }
})

module.exports = {
  conn: conn
};

_.each(modelMap, function(model, name) {
  module.exports[name] = model;
})
