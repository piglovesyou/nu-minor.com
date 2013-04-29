
goog.provide('app.items.BadButton');

goog.require('goog.ui.Component');
goog.require('app.soy');
goog.require('app.items.Button');

goog.scope(function() {

// Aliase namespaces only for this JavaScript file.
var getAncestor = app.dom.getAncestorFromEventTargetByClass;
var soy = app.soy;


/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {app.items.Button}
 */
app.items.BadButton = function(opt_domHelper) {
  goog.base(this, soy.body.badInner, opt_domHelper);
};
goog.inherits(app.items.BadButton, app.items.Button);


}); // goog.scope
