
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
 * @enum {string}
 */
app.Model.EventType = {
  FORBIDDEN: 'forbidden'
};


/**
 * @param {string} url .
 * @param {Function} callback .
 * @param {Object} opt_obj .
 */
app.Model.prototype.dialog = function(url, callback, opt_obj) {
  var uri = new goog.Uri(url);
  xhr.get.call(xhr, uri.toString(), {}, callback, opt_obj);
};


/**
 * @param {string} method .
 * @param {string} itemId .
 * @param {string} action .
 * @param {Object} params .
 * @param {Function} callback .
 * @param {Object=} opt_obj .
 */
app.Model.prototype.items =
    function(method, itemId, action, params, callback, opt_obj) {
  goog.asserts.assert(!goog.string.contains(action, ' '));
  var uri = new goog.Uri('/items/' + itemId + '/' + action);
  var fn = method === 'POST' ? xhr.post :
           method === 'GET' ? xhr.get : null;
  if (fn) {
    fn.call(xhr, uri.toString(), params, function(err, json) {
      if (err) {
        this.handleError_(err);
        return;
      }
      callback.apply(opt_obj, arguments);
    }, this);
  }
};


/**
 * @private
 * @param {goog.XhrIo} err .
 */
app.Model.prototype.handleError_ = function(err) {
  var type;
  switch (err.getStatus()) {
    case 403:
      type = app.Model.EventType.FORBIDDEN;
      break;
  }
  if (type) this.dispatchEvent(type);
};


/**
 * I want this name space to be global.
 * @type {app.Model}
 */
app.model = app.Model.getInstance();



}); // goog.scope
