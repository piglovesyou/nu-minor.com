
goog.provide('App');

goog.require('app.ui.dialog');
goog.require('app.soy');
goog.require('goog.dom');
goog.require('app.Items');

App = function() {
  // var body = goog.dom.getDocument().body;
  // goog.dom.appendChild(body,
  //     goog.dom.createDom('div', null, 'I\'m from /app/app.js.'));
  // goog.dom.appendChild(body,
  //     goog.dom.htmlToDocumentFragment(
  //       app.soy.soySampleForJs()));

  var itemsWrapEl = goog.dom.getElementByClass('app-items');

  var items = new app.Items();
  items.decorate(itemsWrapEl);

};
