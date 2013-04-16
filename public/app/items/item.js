
goog.provide('app.items.Item');

goog.require('app.dom');
goog.require('app.soy.body');
goog.require('app.model');
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
app.items.Item.prototype.badButtonElm_;


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
    var bad = dh.getElementByClass('app-item-bad');
    if (like && bad) {
      this.likeButtonElm_ = like;
      this.badButtonElm_ = bad;
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
  } else if (getAncestor(el, 'app-item-bad', et) === this.badButtonElm_) {
    this.handleBadClick_(e);
  }
};


/**
 * @private
 * @param {goog.events.Event} e .
 */
app.items.Item.prototype.handleLikeClick_ = function(e) {
  app.model.like(this.getId(), this.handleLikeComplete_, this);
};


/**
 * @private
 * @param {boolean} err .
 */
app.items.Item.prototype.handleLikeComplete_ = function(err, json) {
  goog.asserts.assertNumber(json.currentLike);
  this.updateLikeButton_(json['currentLike'], !!json['userLiked']);
};


/**
 * @param {number} n .
 * @param {boolean} userLiked .
 */
app.items.Item.prototype.updateLikeButton_ = function(n, userLiked) {
  var dh = this.getDomHelper();
  dh.setTextContent(this.likeButtonElm_, n);
  goog.dom.classes.set(this.likeButtonElm_,
      app.soy.body.likeUserClassName({'userLiked': userLiked}));
}


/**
 * @private
 * @param {goog.events.Event} e .
 */
app.items.Item.prototype.handleBadClick_ = function(e) {
  console.log('bad');
};


/** @inheritDoc */
app.items.Item.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};


}); // goog.scope
