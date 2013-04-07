
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/numinor');

var db = module.exports = {

  Item: mongoose.model('Item', {
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
  })
};

// db.foo.ensureIndex({x:1}, {unique:true}); 
