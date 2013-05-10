
goog.provide('app.ui.Message');
goog.provide('app.ui.message');

goog.require('goog.fx.css3.Transition');
goog.require('goog.ui.Popup');



/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Component}
 */
app.ui.Message = function(opt_domHelper) {
  goog.base(this, null, new goog.positioning.AbsolutePosition(0, 0));

  this.dh_ = opt_domHelper || goog.dom.getDomHelper();
  this.eh_ = new goog.events.EventHandler(this);
  var dh = this.dh_;
  var eh = this.eh_;

  var element = dh.createDom('div', {
        className: 'app-message',
        style: 'display:none;opacity:0'
      },
      this.contentElement_ = dh.createDom('div', 'app-message-content'),
      this.closeElement_ = dh.createDom('span', 'app-message-close'));
  this.dh_.append(this.dh_.getDocument().body, element);
  this.setElement(element);
  this.setupTransition_();

  eh.listen(this.closeElement_, 'click', function(e) {
    this.setVisible(false);
  }).listen(this, goog.ui.PopupBase.EventType.HIDE, function(e) {
    this.dispatchEvent(app.ui.Message.EventType.DELEGATE_DISPOSE);
  });
};
goog.inherits(app.ui.Message, goog.ui.Popup);


/**
 * @enum {string}
 */
app.ui.Message.EventType = {
  DELEGATE_DISPOSE: 'delegate_dispose'
};


/**
 * @param {string} html .
 */
app.ui.Message.prototype.setHtml = function(html) {
  this.contentElement_.innerHTML = html;
};


/**
 * @private
 */
app.ui.Message.prototype.setupTransition_ = function() {
  var element = this.getElement();
  var prop = { property: 'opacity', duration: 1, timing: 'lenear', delay: 0};
  var begin = new goog.fx.css3.Transition(element, .15,
      { opacity: 0 }, { opacity: 1 }, prop);
  var end = new goog.fx.css3.Transition(element, .15,
      { opacity: 1 }, { opacity: 0 }, prop);
  this.setTransition(begin, end);
};


/** @inheritDoc */
app.ui.Message.prototype.disposeInternal = function() {
  this.dh_.removeNode(this.getElement());
  if (this.eh_) {
    this.eh_.dispose();
    this.eh_ = null;
  }
  if (this.dh_) {
    this.dh_ = null;
  }
  goog.base(this, 'disposeInternal');
};


/**
 * @constructor
 */
app.ui.Message.Proxy = function() {
  this.msg_ = null;

  this.eh_ = new goog.events.EventHandler(this);
  this.eh_.listen(this,
      app.ui.Message.EventType.DELEGATE_DISPOSE,
      this.handleDelegateDispose_);
};
goog.inherits(app.ui.Message.Proxy, goog.events.EventTarget);
goog.addSingletonGetter(app.ui.Message.Proxy);


/**
 * @private
 * @param {goog.events.Event} e .
 */
app.ui.Message.Proxy.prototype.handleDelegateDispose_ = function(e) {
  goog.asserts.assert(this.msg_ === e.target);
  this.msg_.dispose();
  this.msg_ = null;
};


/**
 * @param {string} html .
 * @return {app.ui.Message} .
 */
app.ui.Message.Proxy.prototype.show = function(html) {
  if (this.msg_) {
    this.msg_.dispose();
  }
  this.msg_ = new app.ui.Message;
  this.msg_.setParentEventTarget(this);
  this.msg_.setHtml(html);
  this.msg_.setVisible(true);
  return this.msg_;
};


/**
 * @type {app.ui.Message.Proxy}
 */
app.ui.message = app.ui.Message.Proxy.getInstance();
