
goog.provide('app.Items');

goog.require('goog.ui.Component');
goog.require('goog.dom.dataset');
goog.require('app.items.Item');



/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Component}
 */
app.Items = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(app.Items, goog.ui.Component);


/** @inheritDoc */
app.Items.prototype.createDom = function() {
  goog.base(this, 'createDom');
};


/** @inheritDoc */
app.Items.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);

  var dh = this.getDomHelper();
  var itemElms = this.getElementsByClass('app-item');
  goog.array.forEach(itemElms, function(itemEl) {
    if (!goog.dom.dataset.get(itemEl, 'itemid')) return;

    var item = new app.items.Item(dh);
    item.canDecorate(itemEl) && item.decorateInternal(itemEl);
    this.addChild(item);
  }, this);
};


/** @inheritDoc */
app.Items.prototype.canDecorate = function(element) {
  if (goog.dom.classes.has(element, 'app-items')) {
    return true;
  }
  return false;
};


/** @inheritDoc */
app.Items.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};


/** @inheritDoc */
app.Items.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
