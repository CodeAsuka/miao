//'story.json'是一本json格式的书目录，指向五个章节内容对应的🔗。
//写一个使用promise的程式把它们下载并按顺序显示出来
var story
getJSON('story.json')
  .then(data => {
    story = data
    return getJSON(story.chapters[0])
  })
  .then(c1 => {
      showHTML(c1)
      return getJSON(story.chapters[1])
    })
  .then(c2 => {
    showHTML(c2)
    return getJSON(story.chapters[2])
  })
  .then(c3 => {
    showHTML(c3)
    return getJSON(story.chapters[3])
  })
  .then(c4 => {
    showHTML(c4)
    return getJSON(stroy.chapters[4])
  }).then(c5 => {
    showHTML(c5)
  })
//其实就相当于p.then().then().then().then().then()，可以简化
//               ||
//               ||
//               ||
//              \  /
//               \/

var p = getJSON('story.json').then(data => {
  story = data
  for(let chapter of story.chapters) {
    p = p.then(() => {
      return getJSON(chapter)
    }).then(ch => {
      showHTML(ch)
    })
  }
})

//好的那么我们现在来让这本书同时下载然后再显示吧，毕竟不是下载视频，根本占不满带宽
//               ||
//               ||
//               ||
//              \  /
//               \/

getJSON('story.js').then(data => {
  var chapters = data.chaptersURl.map(url => getJSON(url))
  return Promise.all(chapters)
}).then(chapters => {
  for(let chapter of chapters) {
    showHTML(chapter)
  }
})

//好的现在让我们写出最终的优化版本，具体方案简单说就是同时下载并且在按照顺序的前提下谁先下载好了就显示出来没必要等所有章节都下载好了再说
//               ||
//               ||
//               ||
//              \  /
//               \/

getJSON('story.js').then(data => {
  var chapters = data.chaptersURl.map(url => getJSON(url))
  var p = Promise.resolve()
  for(let chapter of chapters) {
    p = p.then(() => {
      return chapter
    }).then(chapter => {
      showHTML(chapter)
    })
  }
})
//有没有觉得这个最终版本似曾相识？
//没错！恭喜你少年，你发现了reduce，这是一个累then。
//               ||
//               ||
//               ||
//              \  /
//               \/
//所以我们可以……
getJSON('story.js').then(data => {
  var chapters = data.chaptersURl.map(url => getJSON(url))
  var p =  Promise.resolve() 
  return chapters.reduce((p, cp) => {
    return p.then(() => {
      return cp
    }).then(cp => {
      showHTML(cp)
    })
  })
})

//------------------------------------------------------------

//静态函数在class里声明的时候前面要加static

//实现Promise的静态函数用法resolve
function resolve(val) {
  return new Promise((resolve, reject) => {
    resolve(val)
  })
}

//实现Promise的静态函数用法resolve
function reject(reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

//高频面试题！！！(99%)
//接收若干个promise对象组成的数组，返回一个promise对象，最终resolve出若干个promise对象的结果组成的数组
function all(promises) {
  return new Promise((resolve, reject) => {
    var result = []
    var count = 0
    if(promises.length == 0) { //防止传入的是空数组
      resolve(result)
    }
    for(let i = 0 ; i < promises.length ; i++) {
      Promise.resolve(promises[i]).then(val => { //防止数组中有不是promise对象的东西所以统一用Promise.resolve()包住
        result[i] = val
        count++
        if(count == promises.length)
          resolve(result)
      }, reason => {  //考虑promises数组中的某项promise对象失败
        reject(reason)//那么就让整个promise都失败并把这次失败的原因传入最终返回的promise对象的reject中
      })
    }
  })
}

// race会返回一个promise对象
// 其结果为参数中最先得到结果的promise对象的结果
function race(promises) {
  return new Promise((resolve, reject) => {
    for(let promise of promises) {
      Promise.resolve(promise).then(val => {
        resolve(val)
      }, reason => {
        reject(reason)
      })
    }
  })
}

//和all的区别是：all是数组中任何的promise失败它失败,any数组中任何的promise成功它成功
function any(promises) {

}

//它会等待所有promise都完成
//并且把每个的结果都收集到一个数组中
//数组里面是对象，每个对象表示一个promise的结果
//{status: , value/reason}
function allSettled(promises) {
  return new Promise((resolve, reject) => {
    var result = []
    var count = 0
    for(let i = 0 ; i < promises.length ; i++) {
      Promise.resolve(promises[i]).then(val => {
        result[i] = {
          status: 'fulfilled',
          value: val
        }
        count++
        if(count == promises.length)
          resolve(result)
      }, reason => {
        result[i] = {
          status: 'rejected',
          reason: reason
        }
        count++
        if(count == promises.length)
          resolve(result)
      })
    }
  })
}

//catch的实现
Promise.prototype.catch = function(f) {
  return this.then(null, f)
}

//finally的实现(高频面试题)
Promise.prototype.finally = function(f) {
  return this.then(value => {
    return Promise.resolve(f()).then(() => value)
  }, reason => {
    return Promise.resolve(f()).then(() => {throw reason})
  })
}

//PromiseA+
function ResolvePromise(promise, x, resolve, reject) {
  if(promise === x) {
    reject(new TypeError())
    return
  }
  if(x instanceof MyPromise) {
    x.then(resolve, reject)
    return
  }
  if(x && typeof x == 'object' || typeof x == 'function') {
    var called = false
    try {
      let then = x.then
      if(typeof then === 'function') {
        then.call(x, function resolvePromise(y) {
          if(!called) {
            called = true
            ResolvePromise(promise, y, resolve, reject)
          } else {
            resolve(x)
          }
        }, function rejectPromise(r) {
          if(!called) {
            called = true
            reject(r)
          }
        })
      }
    } catch(e) {
      if(!called) {
        called = true
        reject(e)
      }
    }
  } else {
    resolve(x)
  }
}

// 实现try
function pTry(f, ...args) {
  return new Promise((resolve, reject) => {
    resolve(f(...args))
  })
}

//实现pWithResolvers()
function pWithResolvers() {
  var obj = {}
  obj.promise = new Promise((reject, resolve) => {
    obj.resolve = resolve
    obj.reject = reject
  })
  return obj
}
