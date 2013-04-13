
goog.provide('app.items.Item');

goog.require('app.dom');
goog.require('goog.dom.dataset');
goog.require('goog.ui.Component');



goog.scope(function() {

// Aliase namespaces only for this JavaScript file.
var getAncestor = app.dom.getAncestorFromEventTargetByClass;


/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Component}
 */
app.items.Item = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(app.items.Item, goog.ui.Component);


/** @type {Element} */
app.items.Item.prototype.likeButtonElm_;


/** @type {Element} */
app.items.Item.prototype.unlikeButtonElm_;


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
    var dh = this.getDomHelper();
    var like = dh.getElementByClass('app-item-like');
    var unlike = dh.getElementByClass('app-item-unlike');
    if (like && unlike) {
      this.likeButtonElm_ = like;
      this.unlikeButtonElm_ = unlike;
      return true;
    }
  }
  return false;
};


/** @inheritDoc */
app.items.Item.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var eh = this.getHandler();
  eh.listen(this.getElement(), 'click', this.handleClick_);
};


/**
 * @private
 * @param {goog.events.Event} e .
 */
app.items.Item.prototype.handleClick_ = function(e) {
  var el = this.getElement();
  var et = /**@type{Element}*/(e.target);

  if (getAncestor(el, 'app-item-like', et) === this.likeButtonElm_) {
    this.handleLikeClick_(e);
  } else if (getAncestor(el, 'app-item-unlike', et) === this.unlikeButtonElm_) {
    this.handleUnlikeClick_(e);
  }
};


/**
 * @private
 * @param {goog.events.Event} e .
 */
app.items.Item.prototype.handleLikeClick_ = function(e) {
  console.log('like');
};


/**
 * @private
 * @param {goog.events.Event} e .
 */
app.items.Item.prototype.handleUnlikeClick_ = function(e) {
  console.log('unlike');
};


/** @inheritDoc */
app.items.Item.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};


}); // goog.scope
