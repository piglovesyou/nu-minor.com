
goog.provide('app.items.LikeBad');

goog.require('goog.ui.Component');
goog.require('app.model');
goog.require('app.ui.util');
goog.require('app.soy');
goog.require('app.items.LikeButton');
goog.require('app.items.BadButton');



goog.scope(function() {

// Aliase namespaces only for this JavaScript file.
var getAncestor = app.dom.getAncestorFromEventTargetByClass;
var soy = app.soy;


/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Component}
 */
app.items.LikeBad = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

  var dh = this.getDomHelper();

  /**
   * @type {app.items.LikeButton}
   */
  this.likeButton_ = new app.items.LikeButton(dh);
  this.addChild(this.likeButton_);

  /**
   * @type {app.items.BadButton}
   */
  this.badButton_ = new app.items.BadButton(dh);
  this.addChild(this.badButton_);
};
goog.inherits(app.items.LikeBad, goog.ui.Component);


/** @inheritDoc */
app.items.LikeBad.prototype.createDom = function() {
  goog.base(this, 'createDom');
};


/** @inheritDoc */
app.items.LikeBad.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);

  this.likeButton_.decorate(this.getElementByClass('app-item-like'));
  this.badButton_.decorate(this.getElementByClass('app-item-bad'));
};


/** @inheritDoc */
app.items.LikeBad.prototype.canDecorate = function(element) {
  if (goog.dom.classes.has(element, 'app-item-likebad')) {
    return true;
  }
  return false;
};


/** @inheritDoc */
app.items.LikeBad.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var eh = this.getHandler();
  eh.listen(this.getElement(), 'click', this.handleClick_);
};


/**
 * @private
 * @param {goog.events.Event} e .
 */
app.items.LikeBad.prototype.handleClick_ = function(e) {
  var el = this.getElement();
  var et = /**@type{Element}*/(e.target);

  if (getAncestor(el, 'app-item-like', et) === this.likeButton_.getElement()) {
    this.handleLikeClick_(e);
  } else if (getAncestor(el, 'app-item-bad', et) === this.badButton_.getElement()) {
    this.handleBadClick_(e);
  }

  e.preventDefault();
};


/**
 * @private
 * @param {goog.events.Event} e .
 */
app.items.LikeBad.prototype.handleLikeClick_ = function(e) {
  var id = app.ui.util.getBelongingId(this, app.items.Item);
  app.model.items(id, 'like', this.handleLikeComplete_, this);
};


/**
 * @private
 * @param {boolean} err .
 * @param {app.json.ItemActionResponse} json .
 */
app.items.LikeBad.prototype.handleLikeComplete_ = function(err, json) {
  this.updateButtons_(true, json);
};


/**
 * @private
 * @param {goog.events.Event} e .
 */
app.items.LikeBad.prototype.handleBadClick_ = function(e) {
  var id = app.ui.util.getBelongingId(this, app.items.Item);
  app.model.items(id, 'bad', this.handleBadComplete_, this);
};


/**
 * @private
 * @param {boolean} err .
 * @param {app.json.ItemActionResponse} json .
 */
app.items.LikeBad.prototype.handleBadComplete_ = function(err, json) {
  this.updateButtons_(false, json);
};



/**
 * @private
 * @param {boolean} isLike .
 * @param {app.json.ItemActionResponse} json .
 */
app.items.LikeBad.prototype.updateButtons_ = function(isLike, json) {
  goog.asserts.assertNumber(json.currentLike);
  goog.asserts.assertNumber(json.currentBad);
  var dh = this.getDomHelper();

  var arg = {
    nm_like: {length: json.currentLike},
    nm_bad: {length: json.currentBad},
    userLiked: isLike ? json.wasPushed : !json.wasOppositePulled,
    userMarkedBad: !isLike ? json.wasPushed : !json.wasOppositePulled
  };

  var button = isLike ? this.likeButton_ : this.badButton_;
  button.update(arg);
  button.enablePrimary(json.wasPushed);

  if (json.wasOppositePulled) {
    var opposite = !isLike ? this.likeButton_ : this.badButton_;
    opposite.update(arg);
    opposite.enablePrimary(false);
  }
};


/** @inheritDoc */
app.items.LikeBad.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};


}); // goog.scope
