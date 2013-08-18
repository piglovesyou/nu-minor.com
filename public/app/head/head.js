
goog.provide('app.Head');

goog.require('goog.ui.Component');
goog.require('app.head.MenuToggle');



/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Component}
 */
app.Head = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

};
goog.inherits(app.Head, goog.ui.Component);


/** @inheritDoc */
app.Head.prototype.createDom = function() {
  goog.base(this, 'createDom');
};


/** @inheritDoc */
app.Head.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);

  // this.menuToggle =
  //     new app.head.MenuToggle(this.getElementByClass('app-menu'));
  // this.menuToggle.decorateInternal(this.getElementByClass('app-menutoggle'));
  // console.log('-------');
  // this.addChild(this.menuToggle);
};


/** @inheritDoc */
app.Head.prototype.canDecorate = function(element) {
  if (element) {
    return true;
  }
  return false;
};


/** @inheritDoc */
app.Head.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};


/** @inheritDoc */
app.Head.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
