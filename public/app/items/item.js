
goog.provide('app.items.Item');

goog.require('goog.ui.Component');
goog.require('goog.dom.dataset');



/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Component}
 */
app.items.Item = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(app.items.Item, goog.ui.Component);


/** @inheritDoc */
app.items.Item.prototype.createDom = function() {
  goog.base(this, 'createDom');
};


/** @inheritDoc */
app.items.Item.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);
  this.setId(goog.dom.dataset.get(element, 'itemid'));
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
