var Q = require('q');
var child_process = require('child_process');

module.exports.spawn = spawn

function spawn() {
  var d = Q.defer();
  var command = child_process.spawn.apply(child_process, arguments);
  var stdout = '',
      stderr = '';

  command.stdout.on('data', function (data) {
    stdout += data;
  });

  command.stderr.on('data', function (data) {
    stderr += data;
  });

  command.on('close', function (code) {
    if (code > 0) {
      d.reject(stderr);
    } else {
      d.resolve(stdout)
    }
  });

  return d.promise;
}
