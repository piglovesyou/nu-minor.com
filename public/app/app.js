
goog.provide('App');

goog.require('app.Items');
goog.require('app.soy');
goog.require('app.ui.Message');
goog.require('app.ui.dialog');
goog.require('goog.dom');

App = function() {

  var itemsWrapEl = goog.dom.getElementByClass('app-items');

  var items = new app.Items();
  items.decorate(itemsWrapEl);

};
