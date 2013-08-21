
var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/nu-minor');
var _ = require('underscore');


var schemaMap = {};
var modelMap = {};


// user schema
schemaMap.user = require('./schema/user');

// item schema
schemaMap.item = _.extend(
    require('./schema/youtube'),
    require('./schema/soundcloud'),
    require('./schema/twitter'),
    require('./schema/itembase'));



// Initialize models
_.each(schemaMap, function(schema, name) {
  try {
    modelMap[name] = mongoose.model(name, schema);
  } catch (e) {
    modelMap[name] = mongoose.model(name);
  }
});

module.exports.conn = conn;

_.each(modelMap, function(model, name) {
  module.exports[name] = model;
});

