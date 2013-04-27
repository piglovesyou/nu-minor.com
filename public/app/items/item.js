
goog.provide('app.items.Item');

goog.require('app.dom');
goog.require('app.json');
goog.require('app.model');
goog.require('app.soy.body');
goog.require('goog.dom.dataset');
goog.require('goog.ui.Component');



goog.scope(function() {

// Aliase namespaces only for this JavaScript file.
var getAncestor = app.dom.getAncestorFromEventTargetByClass;
var soy = app.soy;


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
  this.likeButtonInnerElm_ = null;


  /** @type {Element} */
  this.badButtonElm_ = null;


  /** @type {Element} */
  this.badButtonInnerElm_ = null;

};
goog.inherits(app.items.Item, goog.ui.Component);


/** @inheritDoc */
app.items.Item.prototype.createDom = function() {
  goog.base(this, 'createDom');
};


/** @inheritDoc */
app.items.Item.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);
  var id = goog.dom.dataset.get(element, 'itemid');
  goog.asserts.assertString(id);
  this.setId(id);
};


/** @inheritDoc */
app.items.Item.prototype.canDecorate = function(element) {
  if (goog.dom.classes.has(element, 'app-item')) {
    var dh = this.getDomHelper();
    var like = this.likeButtonElm_ = dh.getElementByClass('app-item-like', element);
    var bad = this.badButtonElm_ = dh.getElementByClass('app-item-bad', element);
    if (like && bad) {
      var likeInner = dh.getElementByClass('app-item-like-inner', like);
      var badInner = dh.getElementByClass('app-item-bad-inner', bad);
      if (likeInner && badInner) {
        this.likeButtonInnerElm_ = likeInner;
        this.badButtonInnerElm_ = badInner
        return true;
      }
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

  e.preventDefault();
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
 * @param {app.json.ItemActionResponse} json .
 */
app.items.Item.prototype.handleLikeComplete_ = function(err, json) {
  this.updateButtons_(true, json);
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
 * @param {app.json.ItemActionResponse} json .
 */
app.items.Item.prototype.handleBadComplete_ = function(err, json) {
  this.updateButtons_(false, json);
};



/**
 * @private
 * @param {boolean} isLike .
 * @param {app.json.ItemActionResponse} json .
 */
app.items.Item.prototype.updateButtons_ = function(isLike, json) {
  goog.asserts.assertNumber(json.currentLike);
  goog.asserts.assertNumber(json.currentBad);
  var dh = this.getDomHelper();

  var arg = {
    nm_like: {length: json.currentLike},
    nm_bad: {length: json.currentBad},
    userLiked: isLike ? json.wasPushed : !json.wasOppositePulled,
    userMarkedBad: !isLike ? json.wasPushed : !json.wasOppositePulled
  };

  var el = isLike ? this.likeButtonElm_ : this.badButtonElm_;
  var renderer = isLike ? soy.body.likeInner : soy.body.badInner;
  goog.dom.classes.enable(el, 'btn-primary', json.wasPushed);

  el.innerHTML = renderer(arg);
  if (json.wasOppositePulled) {
    el = !isLike ? this.likeButtonElm_ : this.badButtonElm_;
    renderer = !isLike ? soy.body.likeInner : soy.body.badInner;
    goog.dom.classes.enable(el, 'btn-primary', false);
    el.innerHTML = renderer(arg);
  }
};


/** @inheritDoc */
app.items.Item.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};


}); // goog.scope
