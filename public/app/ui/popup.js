
goog.provide('app.ui.Popup');

goog.require('goog.fx.css3.Transition');
goog.require('goog.ui.Popup');



/**
 * @constructor
 * @inheritDoc
 * @extends {goog.ui.Popup}
 */
app.ui.Popup = function(triggerElement) {

  goog.base(this, null,
      new goog.positioning.AnchoredPosition(triggerElement,
        goog.positioning.Corner.BOTTOM_RIGHT));

  this.triggerElement_ = triggerElement;
  this.dh_ = goog.dom.getDomHelper();
  this.eh_ = new goog.events.EventHandler(this);

  this.setup_();
};
goog.inherits(app.ui.Popup, goog.ui.Popup);


/**
 * @private
 */
app.ui.Popup.prototype.setup_ = function() {
  this.createDomInternal_();
  this.dh_.append(this.dh_.getDocument().body, this.getElement());

  // Setup.
  // width: 207px
  this.setMargin(0, 0, 0, -(this.triggerElement_.offsetWidth + 207) / 2);
  this.setHideOnEscape(true);
  this.setAutoHide(true);
  this.setupTransition_();
};


/**
 * @private
 */
app.ui.Popup.prototype.setupTransition_ = function() {
  var element = this.getElement();
  var prop = { property: 'opacity', duration: 1, timing: 'lenear', delay: 0};
  var begin = new goog.fx.css3.Transition(element, .15,
      { opacity: 0 }, { opacity: 1 }, prop);
  var end = new goog.fx.css3.Transition(element, .15,
      { opacity: 1 }, { opacity: 0 }, prop);
  this.setTransition(begin, end);
};


/**
 * @param {string} html .
 */
app.ui.Popup.prototype.setHtml = function(html) {
  this.contentElement_.innerHTML = html;
};


/**
 * @private
 */
app.ui.Popup.prototype.createDomInternal_ = function() {
  var dh = this.dh_;
  var element = dh.createDom('div', {
    className: 'tooltip fade bottom in',
    style: 'display:none;opacity:0'
  }, dh.createDom('div', 'tooltip-arrow'),
      this.contentElement_ = dh.createDom('div',
        'tooltip-inner', 'loading...'));
  this.setElement(element);
};


//
//
// /** @inheritDoc */
// app.ui.Popup.prototype.decorateInternal = function(element) {
//   goog.base(this, 'decorateInternal', element);
// };
//
//
// /** @inheritDoc */
// app.ui.Popup.prototype.canDecorate = function(element) {
//   if (element) {
//     return true;
//   }
//   return false;
// };
//
//
// /** @inheritDoc */
// app.ui.Popup.prototype.enterDocument = function() {
//   goog.base(this, 'enterDocument');
// };
//
//
// /** @inheritDoc */
// app.ui.Popup.prototype.disposeInternal = function() {
//   goog.base(this, 'disposeInternal');
// };
