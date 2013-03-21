
goog.provide('main');

goog.require('App');


/***/
main = function() {
  App();
  document.write('I\'m from /javascripts/main.js.');
};



goog.exportSymbol('main', main);
