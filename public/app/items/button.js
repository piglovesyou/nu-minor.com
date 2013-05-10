
goog.provide('app.items.Button');

goog.require('app.soy.popup');
goog.require('app.ui.Popup');
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
  var eh = this.getHandler();
  var element = this.getElement();

  eh.listenOnce(element, 'mouseover', function(e) {
      this.popup_ = new app.ui.Popup(element);
      eh.listenOnce(this.popup_,
          goog.ui.PopupBase.EventType.BEFORE_SHOW, function(e) {
        this.loadTooltipContent_();
      });
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
    this.popup_.setHtml(err ? 'Fail.' : app.soy.popup.main({
      type: this.type_,
      users: json['nm_' + this.type_]
    }));
  }, this);
};


/** @inheritDoc */
app.items.Button.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
