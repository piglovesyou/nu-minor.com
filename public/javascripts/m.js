
var m = new Masonry(document.querySelector('.app-items'), {
  itemSelector: '.app-item',
  isInitLayout: false
});
m._originalLayout = m.layout;
m.layout = function() {
  m.options.columnWidth = getSize(document.querySelector('.span3')).outerWidth;
  m._originalLayout();
};
m.layout();
setTimeout(function() {
  m.layout();
}, 800);
