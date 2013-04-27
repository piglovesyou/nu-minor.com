
var _ = require('underscore');
var assert = require('assert');

describe('Item Base', function() {
  it('should have FieldNames and Schema properties', function(done) {
    var itembase = require('../../src/schema/itembase.js');

    assert(itembase.nm_type);
    assert(itembase.nm_like);

    done();
  });
});
