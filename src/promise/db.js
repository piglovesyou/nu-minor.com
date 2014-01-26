
var Q = require('../moduleproxy/q');
var schema = require('../schema/schema');

module.exports.items = {
  find: Q.denodeify(schema.item.find.bind(schema.item)),
  findOne: Q.denodeify(schema.item.findOne.bind(schema.item)),
  count: Q.denodeify(schema.item.count.bind(schema.item)),
  update: Q.denodeify(schema.item.update.bind(schema.item))
};

module.exports.users = {
  findOne: Q.denodeify(schema.user.findOne.bind(schema.user)),
  update: Q.denodeify(schema.user.update.bind(schema.user))
};
