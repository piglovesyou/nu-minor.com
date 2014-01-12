_ = require("underscore")
assert = require("assert")
describe "Item Base", ->
  it "should have FieldNames and Schema properties", (done) ->
    itembase = require("../src/schema/base.js")
    assert itembase.nm_type
    assert itembase.nm_like
    done()


