
var spawn = require('../promise/spawn').spawn;

var isLocked = false;
exports.update = function(req, res) {
  if (isLocked) res.end('now updating...');
  isLocked = true;
  spawn('mocha')
  .then(function() {
    res.end('updated.')
  })
  .fail(function() {
    res.end('something wrong.')
  })
  .done(function() {
    isLocked = false;
  });
};
