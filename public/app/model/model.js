
goog.provide('app.Model');
goog.provide('app.model');

goog.require('app.events.EventType');



/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
app.Model = function() {
  goog.base(this);
};
goog.inherits(app.Model, goog.events.EventTarget);
goog.addSingletonGetter(app.Model);


/**
 * @type {app.Model}
 */
app.model = app.Model.getInstance();
