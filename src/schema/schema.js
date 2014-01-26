
var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/nu-minor');
var _ = require('underscore');

var schemaMap = {};
var modelMap = {};

// item schema
schemaMap.item = _.extend(
    require('./youtube'),
    require('./soundcloud'),
    require('./twitter'),
    require('./googlecalendar'),
    require('./base'));

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

