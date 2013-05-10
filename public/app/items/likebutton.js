
goog.provide('app.items.LikeButton');

goog.require('app.items.Button');
goog.require('app.soy');
goog.require('goog.ui.Component');

goog.scope(function() {

// Aliase namespaces only for this JavaScript file.
var getAncestor = app.dom.getAncestorFromEventTargetByClass;
var soy = app.soy;



/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {app.items.Button}
 */
app.items.LikeButton = function(opt_domHelper) {
  goog.base(this, 'like', soy.body.likeInner, opt_domHelper);
};
goog.inherits(app.items.LikeButton, app.items.Button);


}); // goog.scope
