
goog.provide('app.items.Item');

goog.require('app.dom');
goog.require('app.json');
goog.require('app.model');
goog.require('app.soy.body');
goog.require('goog.dom.dataset');
goog.require('goog.ui.Component');
goog.require('app.items.LikeBad');



goog.scope(function() {

// Aliase namespaces only for this JavaScript file.
var getAncestor = app.dom.getAncestorFromEventTargetByClass;
var soy = app.soy;


/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Component}
 */
app.items.Item = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

  var dh = this.getDomHelper();

  /**
   * @type {app.items.LikeBad}
   */
  this.likeBad_ = new app.items.LikeBad(dh);
  this.addChild(this.likeBad_)
};
goog.inherits(app.items.Item, goog.ui.Component);


/** @inheritDoc */
app.items.Item.prototype.createDom = function() {
  goog.base(this, 'createDom');
};


/** @inheritDoc */
app.items.Item.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);

  var id = goog.dom.dataset.get(element, 'itemid');
  goog.asserts.assertString(id);
  this.setId(id);

  var likeBadElm = this.getElementByClass('app-item-likebad');
  this.likeBad_.decorate(likeBadElm);
};


/** @inheritDoc */
app.items.Item.prototype.canDecorate = function(element) {
  if (goog.dom.classes.has(element, 'app-item')) {
    return true;
  }
  return false;
};


/** @inheritDoc */
app.items.Item.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};


/** @inheritDoc */
app.items.Item.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};


}); // goog.scope
