
goog.provide('app.Model');
goog.provide('app.model');

goog.require('app.model_.Xhr');
goog.require('goog.string');



goog.scope(function() {

// Aliase namespaces only for this JavaScript file.
var xhr = app.model_.xhr;


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
 * @param {string} itemId .
 * @param {string} action .
 * @param {Function} callback .
 * @param {Object=} opt_obj .
 */
app.Model.prototype.items = function(itemId, action, callback, opt_obj) {
  goog.asserts.assert(!goog.string.contains(action, ' '));
  var uri = new goog.Uri('/items/' + itemId + '/' + action);
  xhr.post(uri.toString(), {}, callback, opt_obj);
};


/**
 * I want this name space to be global.
 * @type {app.Model}
 */
app.model = app.Model.getInstance();



}); // goog.scope
