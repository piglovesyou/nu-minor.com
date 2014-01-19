(function() {
  var assert, _;

  _ = require("underscore");

  assert = require("assert");

  describe("Item Base", function() {
    return it("should have FieldNames and Schema properties", function(done) {
      var itembase;
      itembase = require("../src/schema/base.js");
      assert(itembase.nm_type);
      assert(itembase.nm_like);
      return done();
    });
  });

}).call(this);
