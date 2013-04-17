
goog.provide('app.items.Item');

goog.require('app.dom');
goog.require('app.model');
goog.require('app.soy.body');
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


  /** @type {Element} */
  this.likeButtonElm_ = null;


  /** @type {Element} */
  this.badButtonElm_ = null;

};
goog.inherits(app.items.Item, goog.ui.Component);


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
    var like = dh.getElementByClass('app-item-like', element);
    var bad = dh.getElementByClass('app-item-bad', element);
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
  app.model.action(this.getId(), 'like', this.handleLikeComplete_, this);
};


/**
 * @private
 * @param {boolean} err .
 * @param {Object} json .
 */
app.items.Item.prototype.handleLikeComplete_ = function(err, json) {
  goog.asserts.assertNumber(json.currentLike);
  this.updateButton_(this.likeButtonElm_, json['currentLike'],
      !!json['userLiked'], 'icon-heart', 'icon-heart-empty');
};


/**
 * @private
 * @param {goog.events.Event} e .
 */
app.items.Item.prototype.handleBadClick_ = function(e) {
  app.model.action(this.getId(), 'bad', this.handleBadComplete_, this);
};


/**
 * @private
 * @param {boolean} err .
 * @param {Object} json .
 */
app.items.Item.prototype.handleBadComplete_ = function(err, json) {
  goog.asserts.assertNumber(json.currentBad);
  this.updateButton_(this.badButtonElm_, json['currentBad'],
      !!json['userMarkedBad'], 'icon-skull', 'icon-thumbs-down');
};


/**
 * @private
 * @param {Element} el .
 * @param {number} n .
 * @param {boolean} active .
 * @param {string} whenActive .
 * @param {string} whenInactive .
 */
app.items.Item.prototype.updateButton_ = function(el, n, active,
                                                  whenActive, whenInactive) {
  var dh = this.getDomHelper();
  dh.setTextContent(el, n);

  var from = active ? whenInactive : whenActive;
  var to = active ? whenActive : whenInactive;
  goog.dom.classes.swap(el, from, to);
};


/** @inheritDoc */
app.items.Item.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};


}); // goog.scope
