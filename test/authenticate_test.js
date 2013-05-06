
assert = require('assert');
webdriver = require('selenium-webdriver');
buildDriver = function() {
  var d = new webdriver.Builder()
    .usingServer('http://localhost:4444/wd/hub')
    .withCapabilities({
      browserName: 'firefox'
    }).build();
  d.manage().window().setSize(350, 200);
  return d;
};

var whenFail = function(driver) {
  return function(reason) {
    driver.quit().then(function() {
      throw new Error(reason);
    });
  }
};



describe('auth', function() {
  this.timeout(30 * 1000);
  var d = buildDriver();

  it('#Open page', function(done) {
    d.get('http://nu-minor.com');

    d.getTitle()
    .then(function(title) {
      assert.equal(title, 'Plovr Sample');
    })
    .then(function() {
      return d.quit();
    })
    .then(null, whenFail(d))
    .then(function() {
      done();
    });
  });

  it('#Login', function(done) {
  });

});

