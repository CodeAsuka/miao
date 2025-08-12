function * foo() {
  var a = yield getVal(8)
  console.log(a)
  var b = yield getVal(15)
  console.log(b)
  return a + b
}
function getVal(val, time = 2000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(val)
    }, time)
  })
}
function get(url) {
  return new Promise((resolve) => {
    var xhr = new XMLHttpRequest()
    xhr.open('get', url)
    xhr.onload = () => {
      resolve(xhr.responseText)
    }
    xhr.send()
  })
}

//以我们希望的方式执行一个总是生成promise的生成器函数
//每生成一个promise出来，我们就等待这个promise的结果
//之后再恢复生成器函数的执行
//并且返回一个promise来表征这个函数的慢慢运行
//函数运行完的时候就是返回的promise resolve的时候
function run(genFn) {
  return new Promise((resolve,reject) => {
    var generator = genFn()
    var generated = generator.next()
    step()
    function step() {
      if(generated.done == true) {
        resolve(generated.value)
      }else{
        generated.value.then(val => {
          generated = generator.next(val)
          step()
        })
      }
    }
  })
}

//能够处理promise对象出错的版本
function * foo() {
  var a = yield getVal(8)
  console.log(a)
  try {
    var b = yield Promise.reject(5)
    console.log(b)
  } catch(e) {
    console.error(e)
  }
  return 222
}
run(function * () {
  var a = yield getVal(5)
  console.log(a)
  throw 3
  var b = yield getVal(6)
  console.log(a + b)
  console.log(a + b)
  return getVal(7, 3000)
}).then(val => {
  console.log(val)
},r => {
  console.error(r)
})

function run(genFn) {
  return new Promise((resolve,reject) => {
    var generator = genFn()
    try {
      var generated = generator.next()
      step()
    } catch(e) {
      reject(e)
    }
    function step() {
      if(generated.done == true) {
        resolve(generated.value)
      }else{
        generated.value.then(val => {
          try {
            generated = generator.next(val)
            step()
          } catch(e) {
            reject(e)
          }
        }, reason => {
          try {
            generated = generator.throw(reason)
            step()
          } catch(e) {
            reject(e)
          }
        })
      }
    }
  })
}

// await // yield
// async // *

//异步函数
async function bar() {
  var a = await getValue(8)

  console.log(a)

  var b = await getVal(9)
  console.log(b)

  return a + b
}

// bar().then(v => {
//   console.log(v)
// })
// 等待两秒log一个8
// 在等待两秒log一个9和17
