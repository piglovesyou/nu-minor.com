
exports.view = function(req, res) {
  console.log(req.params.itemid);
  res.end('yeah')
};
