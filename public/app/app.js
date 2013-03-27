
goog.provide('App');

goog.require('app.soy');
goog.require('goog.dom');

App = function() {
  var body = goog.dom.getDocument().body;

  goog.dom.appendChild(body,
      goog.dom.createDom('div', null, 'I\'m from /app/app.js.'));

  goog.dom.appendChild(body,
      goog.dom.htmlToDocumentFragment(
        app.soy.soySampleForJs()));
};
