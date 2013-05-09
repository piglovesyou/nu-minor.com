
goog.provide('app.ui.Dialog');
goog.provide('app.ui.dialog');

goog.require('goog.ui.Dialog');



/**
 * @constructor
 * @inheritDoc
 * @extends {goog.ui.Dialog}
 */
app.ui.Dialog = function(opt_useIframeMask, opt_domHelper) {
  goog.base(this, 'app-dialog', opt_useIframeMask, opt_domHelper);
};
goog.inherits(app.ui.Dialog, goog.ui.Dialog);


/** @inheritDoc */
app.ui.Dialog.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.getHandler().listen(this, [
      goog.ui.PopupBase.EventType.BEFORE_SHOW,
      goog.ui.PopupBase.EventType.HIDE], function(e) {
    goog.dom.classes.enable(this.getDomHelper().getDocument().body,
      'dialog-shown', e.type === goog.ui.PopupBase.EventType.BEFORE_SHOW);
  });
};


// /**
//  *
//  */
// app.ui.Dialog.Proxy.prototype.show = function(url, renderer) {
//   var d = this.getDialog_();
//   d.setTitle('loading...');
//   d.setContent('');
//   d.setVisible(true);
//   app.Model.prototype.dialog(url, goog.bind(this.handleComplete_, this, renderer));
// };
//
//
// /**
//  * @param {boolean} err .
//  * @param {app.json.DialogResponse} json .
//  */
// app.ui.Dialog.Proxy.prototype.handleComplete_ = function(renderer, err, json) {
//   if (err) {
//     d.setTitle('An error occurs.');
//     return;
//   }
//   d.setTitle(json.title);
//   d.setContent(renderer(json));
//   d.reposition();
// };
