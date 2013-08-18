
goog.provide('app.ui.Dialog');
goog.provide('app.ui.dialog');

goog.require('goog.ui.Dialog');



/**
 * @constructor
 * @param {boolean=} opt_useIframeMask .
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Dialog}
 */
app.ui.Dialog = function(opt_useIframeMask, opt_domHelper) {
  goog.base(this, 'app-dialog', opt_useIframeMask, opt_domHelper);
  this.setButtonSet(null);
};
goog.inherits(app.ui.Dialog, goog.ui.Dialog);


/** @inheritDoc */
app.ui.Dialog.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.getHandler().listen(this, [
      goog.ui.PopupBase.EventType.BEFORE_SHOW,
      goog.ui.Dialog.EventType.AFTER_HIDE], function(e) {
    goog.dom.classes.enable(this.getDomHelper().getDocument().body,
      'dialog-shown', e.type === goog.ui.PopupBase.EventType.BEFORE_SHOW);
  });
};

