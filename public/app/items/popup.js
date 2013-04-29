
goog.provide('app.items.Popup');

goog.require('goog.fx.css3.Transition');
goog.require('goog.ui.Popup');



/**
 * @constructor
 * @inheritDoc
 * @extends {goog.ui.Popup}
 */
app.items.Popup = function(targetElement) {

  goog.base(this, null,
      new goog.positioning.AnchoredPosition(targetElement,
        goog.positioning.Corner.BOTTOM_RIGHT));

  this.dh_ = goog.dom.getDomHelper();
  var dh = this.dh_;
  this.createDomInternal_();
  var element = this.getElement();
  dh.append(dh.getDocument().body, element);

  // Setup.
  // width: 207px
  this.setMargin(0, 0, 0, -(targetElement.offsetWidth + 207) / 2);
  this.setHideOnEscape(true);
  this.setAutoHide(true);
  this.setTransition(
    new goog.fx.css3.Transition(element, 1000, { opacity: 0 }, { opacity: 1 },
      {property: 'opacity', duration: 1, timing: 'lenear', delay: 0}),
    new goog.fx.css3.Transition(element, 1000, { opacity: 1 }, { opacity: 0 },
      {property: 'opacity', duration: 1, timing: 'lenear', delay: 0}));
};
goog.inherits(app.items.Popup, goog.ui.Popup);


/**
 * @param {string} html .
 */
app.items.Popup.prototype.setHtml = function(html) {
  this.contentElement_.innerHTML = html;
};


/**
 * @private
 */
app.items.Popup.prototype.createDomInternal_ = function() {
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
// app.items.Popup.prototype.decorateInternal = function(element) {
//   goog.base(this, 'decorateInternal', element);
// };
//
//
// /** @inheritDoc */
// app.items.Popup.prototype.canDecorate = function(element) {
//   if (element) {
//     return true;
//   }
//   return false;
// };
//
//
// /** @inheritDoc */
// app.items.Popup.prototype.enterDocument = function() {
//   goog.base(this, 'enterDocument');
// };
//
//
// /** @inheritDoc */
// app.items.Popup.prototype.disposeInternal = function() {
//   goog.base(this, 'disposeInternal');
// };
