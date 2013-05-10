
goog.provide('app.ui.Popup');

goog.require('goog.fx.css3.Transition');
goog.require('goog.ui.AdvancedTooltip');



/**
 * @constructor
 * @inheritDoc
 * @extends {goog.ui.AdvancedTooltip}
 */
app.ui.Popup = function(triggerElement) {
  this.className = 'app-popup';
  goog.base(this, triggerElement);

  this.dh_ = goog.dom.getDomHelper();

  this.setupElement_();
  this.setupOptions_();
};
goog.inherits(app.ui.Popup, goog.ui.AdvancedTooltip);


/**
 * @private
 */
app.ui.Popup.prototype.setupElement_ = function() {
  var element = this.getElement();

  goog.style.setStyle(element, {
    display: 'none',
    opacity: 0
  });

  this.dh_.append(element,
      this.dh_.createDom('div', 'tooltip-arrow'),
      this.contentElement_ = this.dh_.createDom('div',
        'tooltip-inner', 'loading...'));
};


/**
 * @private
 */
app.ui.Popup.prototype.setupOptions_ = function() {
  this.setupTransition_();
  this.setCursorTracking(true); // cool.
  this.setHotSpotPadding(new goog.math.Box(5, 5, 5, 5));
  this.setHideDelayMs(250);
  this.setHideOnEscape(true);

  var defaultFixedMargin = 10;
  var popupWidth = 207;
  this.setMargin(0, 0, 0, -(popupWidth / 2) - defaultFixedMargin);
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
 * @param {string} str .
 */
app.ui.Popup.prototype.setText = function(str) {
  this.dh_.setTextContent(this.contentElement_, str);
};
