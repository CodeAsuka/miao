var b = require('./b.js')

exports.foo = function() {
  return 'foo' + b.bar()
}