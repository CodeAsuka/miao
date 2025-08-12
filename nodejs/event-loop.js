// const fs = require('fs')
// fs.readFile('Asuka', (err, data) => {
//   setTimeout(() => {
//     console.log(1)
//   })
//   setImmediate(() => {
//     console.log(2)
//   })
//   process.nextTick(() => { //调用栈空了以后执行它的回调
//     console.log(3)
//   })
// })

//3
//2
//1
 
// setTimeout(() => {
//   console.log(1)
//   process.nextTick(() => {
//     console.log('tick1')
//   })
//   process.nextTick(() => {
//     console.log('tick2')
//     process.nextTick(() => {
//       console.log('tick2.1')
//     })
//   })
//   process.nextTick(() => {
//     console.log('tick3')
//   })
// })
// setTimeout(() => {
//   console.log(2)
// })

// setImmediate(() => {
//   console.log('immediate')
// })

// var count = 0
// var start = Date.now()
// setImmediate(function f() {
//   count++
//   if(Date.now() - start < 1000) {
//     setImmediate(f)
//   } else {
//     console.log(count)
//   }
// })
//81178

// var count = 0
// var start = Date.now()
// process.nextTick(function f() {
//   count++
//   if(Date.now() - start < 1000) {
//     process.nextTick(f)
//   } else {
//     console.log(count)
//   }
// })
//18280589

// var count = 0
// var start = Date.now()
// setTimeout(function f() {
//   count++
//   if(Date.now() - start < 1000) {
//     setTimeout(f)
//   } else {
//     console.log(count)
//   }
// })
//868

// Promise.resolve().then(() => {
//   console.log(1)
// })
// process.nextTick(() => {
//   console.log(2)
// })

setImmediate(() => {
  console.log('imm')
})
Promise.resolve().then(function f() {
  process.nextTick(() => {
    console.log(1)
  })
  Promise.resolve().then(f)
})
//如果让nextTick和then的回调函数一直执行，那么你就永远都看不到事件循环里面的回调函数运行
//调用栈清空以后先运行.nextTick的cb再运行then的cb


/**浏览器的时间循环:
 * 浏览器将任务分为两种:
 * 微任务
 * 宏任务
 * 
 * 微任务总是在调用栈里的函数清空后立马执行,调用栈清空后，执行微任务前，浏览器是不做渲染的
 * 宏任务在执行前，浏览器还会绘制一下dom,即paint(当然也会有layout)
 * 宏任务:setTimeout/Interval,click事件这种也是,postMessage
 * 微任务:promise的回调,queueMicrotask,(注意浏览器里面没有nextTick),MutationObserver
 * 
 * MutationObserver可以监控一个dom元素的变化,变了以后它会调用我们提供的函数，是通过微任务的方式调用的该函数
 * (中文直译是变化监控器)
 * 例:
 * var mo = new MutationObserver(function moFunc() {
 *   console.log(1)
 * })
 * mo.observe(document.body, {attributes: true})
 * document.body.setAttribute('foo', 'bar') //将会触发log(1)
 * 
 * promise的回调在promise成功的那一刻被放进微任务队列(或者说promise回调队列)
 * 
 * 
 */

//请问log顺序:
// console.log(6)
// new Promise(resolve => {
//   console.log(4)

//   new Promise(resolve => {
  
//     resolve()
//   }).then(() => console.log(2)).then(() => console.log(7))
//   resolve()
// }).then(() => console.log(3))

// console.log(5)
//答案是:6 4 5 2 3 7



// async function foo() {
//   console.log(4)
//   await baz()
//   console.log(6)
//   await baz()
//   console.log(6)
// }
// async function baz() {
//   console.log(1)
// }
// async function bar() {
//   console.log(2)
//   await Promise.resolve(5)
//   console.log(3)
// }
// foo()
// bar()
//log顺序是4 1 2 6 1 3 6
//想要更多这种代码可以在网上搜:事件循环面试题
//上面这种异步函数的代码可以转换成把await后面的东西加上then然后去掉await
// 然后把函数中剩余的内容包在then后面的语句块里，如果里面再遇到await就再转成then再嵌套语句块
//我们可以试着把上面的几个函数化成sync函数:
// function foo() {
//   console.log(4)
//   baz().then(() => {
//     console.log(6)
//     baz().then(() => {
//       console.log(6)
//     })
//   })
// }
// function baz() {
//   console.log(1)
//   return Promise.resolve()
// }
// function bar() {
//   console.log(2)
//   Promise.resolve(5).then(() => {
//     console.log(3)
//   })
// }