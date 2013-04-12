
var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/numinor');



var ItemSchema = {
  id: String,
  title: String,
  id: String,
  uploaded: String,
  updated: String,
  uploader: String,
  category: String,
  title: String,
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



var itemModel;
try {
  itemModel = mongoose.model('Item', ItemSchema) 
} catch (e) {
  itemModel = mongoose.model('Item') 
}

var db = module.exports = {
  conn: conn,
  items: itemModel
};

// db.foo.ensureIndex({x:1}, {unique:true}); 
