
goog.provide('app.ui.Tooltip');

goog.require('goog.ui.Tooltip');



/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Tooltip}
 */
app.ui.Tooltip = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(app.ui.Tooltip, goog.ui.Tooltip);


/** @inheritDoc */
app.ui.Tooltip.prototype.createDom = function() {
  goog.base(this, 'createDom');
};


/** @inheritDoc */
app.ui.Tooltip.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);
};


/** @inheritDoc */
app.ui.Tooltip.prototype.canDecorate = function(element) {
  if (element) {
    return true;
  }
  return false;
};


/** @inheritDoc */
app.ui.Tooltip.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};


/** @inheritDoc */
app.ui.Tooltip.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
