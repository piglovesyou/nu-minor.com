

var soynode = require('soynode')

soynode.setOptions({
    tmpDir: '/tmp/soynode-example'
  , allowDynamicRecompile: true
})

soynode.compileTemplates(__dirname + '/public/soy', function (err) {
  if (err) throw err
  console.log('soynode is ready.');
})

module.exports = soynode;
