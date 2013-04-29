
goog.provide('app.items.Button');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @param {Function} renderer .
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Component}
 */
app.items.Button = function(renderer, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.renderer_ = renderer;
};
goog.inherits(app.items.Button, goog.ui.Component);


app.items.Button.prototype.enablePrimary = function(enable) {
  goog.dom.classes.enable(this.getElement(), 'btn-primary', enable);
}


/**
 * @param {Object} arg .
 */
app.items.Button.prototype.update = function(arg) {
  this.getElement().innerHTML = this.renderer_(arg);
};


/** @inheritDoc */
app.items.Button.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
