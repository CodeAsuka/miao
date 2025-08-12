var a = require('./a.js')

exports.bar = function() {
  return 'bar' + a.foo()
}