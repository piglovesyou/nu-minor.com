
###
  Before run auth test,
   1. Launch app server by 80 port.
   2. Let "nu-minor.com" be seen.
###
  
assert = require("assert")
w = require("selenium-webdriver")
buildDriver = ->
  d = new w.Builder().usingServer("http://localhost:4444/wd/hub").withCapabilities(browserName: "firefox").build()
  d.manage().window().setSize 500, 400
  d

whenFail = (driver, reason) ->
  throw new Error(reason)
  # driver.quit(reason)



describe "auth", ->
  @timeout 30 * 1000
  d = buildDriver()

  it "#Open page", (done) ->
    d.get "http://nu-minor.com"
    d.getTitle().then((title) ->
      assert.equal title, "NU minor | The super super super band"
    ).then(null, whenFail.bind(null, d))
    .then -> done()

  # TODO: Still working this yet
  # it "#Login", (done) ->
  #   d.findElement(w.By.css('a[href="/auth/auth"]'))
  #   .click()
  #   d.getTitle().then (title) ->
  #     assert.equal title, "Twitter / アプリケーション認証"
  #     d.findElement(w.By.name('session[username_or_email]')).sendkeys('stakamur')
      # d.findElement(w.By.css('input#password')).sendkeys('internal')
    #   d.findElement(w.By.css('input#allow')).click()
    #   done();
    # , 10000)
  #   d.wait( ->
  #     d.findElement(w.By.css('a[href="/auth/logout"]')).getText (text)->
  #       assert.equal text, 'stakamur'
  #   , 3000)
  #   .then(null, whenFail.bind(null, d))
  #   .then -> done()
        


