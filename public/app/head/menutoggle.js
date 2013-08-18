
goog.provide('app.head.MenuToggle');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @param {Element} menuEl .
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Component}
 */
app.head.MenuToggle = function(menuEl, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.menuEl = menuEl;

  this.isOpened = goog.style.isElementShown(menuEl);
};
goog.inherits(app.head.MenuToggle, goog.ui.Component);


/** @inheritDoc */
app.head.MenuToggle.prototype.createDom = function() {
  goog.base(this, 'createDom');
};


/** @inheritDoc */
app.head.MenuToggle.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);
  this.openMenu(this.isOpened);
};


/** @inheritDoc */
app.head.MenuToggle.prototype.canDecorate = function(element) {
  if (element) {
    return true;
  }
  return false;
};


/** @inheritDoc */
app.head.MenuToggle.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var eh = this.getHandler();
  eh.listen(this.getElement(), 'click', function(e) {
    this.openMenu(!this.isOpened);
  });

};


app.head.MenuToggle.prototype.openMenu = function(open) {
  if (this.isOpened === open) return;
  var from = !open ? 'app-menu-open' : 'app-menu-close';
  var to = open ? 'app-menu-open' : 'app-menu-close';
  goog.dom.classes.enable(this.menuEl, from, false);
  goog.dom.classes.enable(this.menuEl, to, true);
  this.isOpened = open;
}


/** @inheritDoc */
app.head.MenuToggle.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
