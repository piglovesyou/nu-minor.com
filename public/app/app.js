
goog.provide('App');

goog.require('goog.dom');

App = function() {
  goog.dom.getDocument().body.appendChild(
      goog.dom.createDom('div', null, 'I\'m from /app/app.js.'));
};
