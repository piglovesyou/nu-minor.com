
goog.provide('app.Model');
goog.provide('app.model');

goog.require('app.model.Xhr');
goog.require('goog.string');



goog.scope(function() {

// Aliase namespaces only for this JavaScript file.
var xhr = app.model.xhr;


/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
app.Model = function() {
  goog.base(this);
};
goog.inherits(app.Model, goog.events.EventTarget);
goog.addSingletonGetter(app.Model);


/**
 * @param {string} action .
 * @param {string} itemId .
 * @param {Function} callback .
 * @param {Object=} opt_obj .
 */
app.Model.prototype.action = function(itemId, action, callback, opt_obj) {
  goog.asserts.assert(!goog.string.contains(action, ' '));
  var uri = new goog.Uri('/' + itemId + '/' + action);
  xhr.post(uri, {}, callback, opt_obj);
};


/**
 * I want to use 'app.model' namespace for app.Model instance in global.
 */
var ref = app.model.Xhr;

goog.exportSymbol('app.model');

/**
 * I want this name space in global.
 * @type {app.Model}
 */
app.model = app.Model.getInstance();
goog.global['app']['model'] = app.model;

/**
 */
app.model.Xhr = ref;



}); // goog.scope
