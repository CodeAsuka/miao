export default 2

export var PI = 3.141592653589793238462643383279

export function add(a, b) {
  return a + b
}

export function sub(a, b) {
  return a - b
}

function mul(a, b) {
  return a * b * add(1,2)
}

function div(a, b) {
  return a / b
}

export {mul, div}
