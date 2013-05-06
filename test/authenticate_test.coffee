assert = require("assert")
webdriver = require("selenium-webdriver")
buildDriver = ->
  d = new webdriver.Builder().usingServer("http://localhost:4444/wd/hub").withCapabilities(browserName: "firefox").build()
  d.manage().window().setSize 350, 200
  d

whenFail = (driver) ->
  (reason) ->
    driver.quit().then ->
      throw new Error(reason)


describe "auth", ->
  @timeout 30 * 1000
  d = buildDriver()
  it "#Open page", (done) ->
    d.get "http://nu-minor.com"
    d.getTitle().then((title) ->
      assert.equal title, "Plovr Sample"
    ).then(->
      d.quit()
    ).then(null, whenFail(d))
    .then ->
      done()


  # it "#Login", (done) ->


