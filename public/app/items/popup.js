
goog.provide('app.items.Popup');

goog.require('app.ui.Popup');
goog.require('app.soy.dialog');


/**
 * @constructor
 * @inheritDoc
 * @extends {app.ui.Popup}
 */
app.items.Popup = function(triggerElement) {
  goog.base(this, triggerElement);

  this.eh_ = new goog.events.EventHandler(this);
  var eh = this.eh_;
  eh.listenOnce(this, goog.ui.PopupBase.EventType.BEFORE_SHOW, function(e) {
    eh.listen(this.getElement(), goog.events.EventType.CLICK, this.handleClicked_);
  });
};
goog.inherits(app.items.Popup, app.ui.Popup);


/**
 * @private
 * @param {goog.events.Event} e .
 */
app.items.Popup.prototype.handleClicked_ = function(e) {
  var href = this.extractHrefFromEventTarget_(e.target);
  if (href) {
    this.setVisible(false);

    var d = new app.ui.Dialog()
    d.setDisposeOnHide(true);
    d.setContent('loading...');
    d.setVisible(true);
    app.model.users(href, goog.bind(this.handleCompleteUser_, this, d), this);
  }
  e.preventDefault();
};


app.items.Popup.prototype.handleCompleteUser_ = function(dialog, err, json) {
  // Store this json somewhere.
  json['profile_image_url'] = json['profile_image_url'].replace('_normal', '_bigger');
  dialog.setContent(app.soy.dialog.user(json));
  goog.Timer.callOnce(function() {
    dialog.reposition();
  }, 50);
};


/**
 * @private
 * @param {Element} et .
 * @return {Element?} .
 */
app.items.Popup.prototype.extractHrefFromEventTarget_ = function(et) {
  var e = app.dom.getAncestorFromEventTargetByClass(this.getElement(),
      'app-item-popup-user-anchor', et);
  if (e) {
    return e.getAttribute('href');
  }
  return null;
};


// app.items.Popup.prototype.getPositioningStrategy = function(activationType) {
//
// }
