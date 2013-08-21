
goog.provide('app.items.Button');

goog.require('app.items.Popup');
goog.require('app.soy.popup');
goog.require('goog.async.Delay');
goog.require('goog.ui.Component');



/**
 * @constructor
 * @param {string} type .
 * @param {Function} renderer .
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Component}
 */
app.items.Button = function(type, renderer, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.type_ = type;

  this.renderer_ = renderer;

  // this.delay_ = new goog.async.Delay(this.handleTick_, 800, this);
};
goog.inherits(app.items.Button, goog.ui.Component);


/**
 * @param {boolean} enable .
 */
app.items.Button.prototype.enablePrimary = function(enable) {
  goog.dom.classes.enable(this.getElement(), 'btn-primary', enable);
};


/**
 * @param {Object} arg .
 */
app.items.Button.prototype.update = function(arg) {
  if (this.popup_) {
    this.preparePopupReborn_();
  }
  this.getElement().innerHTML = this.renderer_(arg);
};


/** @inheritDoc */
app.items.Button.prototype.createDom = function() {
  goog.base(this, 'createDom');
};


/** @inheritDoc */
app.items.Button.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);
};


/** @inheritDoc */
app.items.Button.prototype.canDecorate = function(element) {
  if (element) {
    return true;
  }
  return false;
};


/** @inheritDoc */
app.items.Button.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.preparePopupBorn_();
};


/**
 * @private
 */
app.items.Button.prototype.preparePopupReborn_ = function() {
  goog.asserts.assert(this.popup_);
  var eh = this.getHandler();

  if (this.popup_.isVisible()) {
    eh.listenOnce(this.popup_, goog.ui.PopupBase.EventType.HIDE, this.rebirthPopup_);
    this.popup_.setVisible(false);
  } else {
    this.rebirthPopup_();
  }
};


/**
 * @private
 */
app.items.Button.prototype.rebirthPopup_ = function() {
  var dh = this.getDomHelper();

  dh.removeNode(this.popup_.getElement());
  this.popup_.dispose();
  this.preparePopupBorn_();
};


/**
 * @private
 */
app.items.Button.prototype.preparePopupBorn_ = function() {
  var eh = this.getHandler();
  var element = this.getElement();
  this.popup_ = new app.items.Popup(element);

  eh.listenOnce(this.popup_, goog.ui.PopupBase.EventType.BEFORE_SHOW, function(e) {
    this.loadTooltipContent_();
  });
};


/**
 * @private
 * @param {goog.events.Event} e .
 */
app.items.Button.prototype.handleTick_ = function(e) {
  this.popup_.setVisible(false);
};

/**
 * @private
 */
app.items.Button.prototype.loadTooltipContent_ = function() {
  var id = app.ui.util.getBelongingId(this, app.items.Item);
  app.model.items('GET', id, 'view', {
    'expand': this.type_
  }, function(err, json) {

    // XXX: hack for ADVANCED_COMPILATION
    var users = goog.array.map(json['nm_' + this.type_], function(val) {
      return {
        user: val
      };
    });

    this.popup_.setHtml(err ? 'Fail.' : app.soy.popup.main({
      type: this.type_,
      users: users
    }));
  }, this);
};


/** @inheritDoc */
app.items.Button.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
