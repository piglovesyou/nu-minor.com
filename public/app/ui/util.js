
goog.provide('app.ui.util');


app.ui.util.getChildIndex = function(parent, child) {
  var index;
  goog.array.find(parent.getChildIds(), function(id, i) {
    if (id == child.getId()) {
      index = i;
      return true;
    }
    return false;
  });
  goog.asserts.assertNumber(index, 'Invalid pare of parent and child');
  return index;
};


/**
 * @param {goog.ui.Component} component
 * @return {string}
 */
app.ui.util.getBelongingId = function(component, parentComponent) {
  var id = app.ui.util.getBelongingComponent(component, parentComponent).getId();
  goog.asserts.assertString(id, '...');
  return id;
};


/**
 * @param {goog.ui.Component} component
 * @param {Function} parentComponent
 * @return {?app.ui.Tab}
 */
app.ui.util.getBelongingComponent = function(component, parentComponent) {
  while (component && !(component instanceof parentComponent)) {
    component = component.getParent();
  }
  goog.asserts.assertInstanceof(component, parentComponent, 'xxx');
  return component;
};
