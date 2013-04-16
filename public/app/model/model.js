
goog.provide('app.Model');
goog.provide('app.model');

goog.require('app.model.Xhr');



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
 * @param {string} itemId .
 * @param {Function} callback .
 * @param {Object=} opt_obj .
 */
app.Model.prototype.like = function(itemId, callback, opt_obj) {
  var uri = new goog.Uri('/' + itemId + '/like');
  xhr.post(uri, {}, callback, opt_obj);
};


/**
 * @type {app.Model}
 */
app.model = app.Model.getInstance();


}); // goog.scope
