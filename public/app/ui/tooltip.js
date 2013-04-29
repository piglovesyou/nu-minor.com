
goog.provide('app.ui.Tooltip');

goog.require('goog.ui.Tooltip');



/**
 * @constructor
 * @inheritDoc
 * @extends {goog.ui.Tooltip}
 */
app.ui.Tooltip = function(opt_el, opt_str, opt_domHelper) {

  this.className = 'tooltip fade bottom in';

  goog.base(this, opt_el, null, opt_domHelper);

  // -(tooltip width: 207px, button width: 20px) / 2
  this.setMargin(0, 0, 0, -114);

  this.renderContent_();

  this.setText(opt_str);
};
goog.inherits(app.ui.Tooltip, goog.ui.Tooltip);


/**
 * @enum {string}
 */
app.ui.Tooltip.EventType = {
  VISIBLE: 'visible'
};


/** @inheritDoc */
app.ui.Tooltip.prototype.setVisible = function(visible) {
  this.dispatchEvent(app.ui.Tooltip.EventType.VISIBLE);
  goog.base(this, 'setVisible', visible);
};


/**
 * @private
 */
app.ui.Tooltip.prototype.renderContent_ = function() {
  var dh = this.getDomHelper();
  dh.append(this.getElement(),
      dh.createDom('div', 'tooltip-arrow'),
      this.contentElement_ = dh.createDom('div', 'tooltip-inner'));
};


/** @inheritDoc */
app.ui.Tooltip.prototype.setText = function(str) {
  goog.dom.setTextContent(this.getContentElement(), str);
};


/** @inheritDoc */
app.ui.Tooltip.prototype.setHtml = function(str) {
  this.getContentElement().innerHTML = str;
};


/** @inheritDoc */
app.ui.Tooltip.prototype.getContentElement = function() {
  return this.contentElement_;
};











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



