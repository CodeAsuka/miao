function asyncMap(arr, asyncMapper, cb) {
  var result = []
  var count = 0
  if(arr.length == 0)
    cb(null, [])
  for(let i = 0 ; i < arr.length ; i++) {
    asyncMapper(arr[i], (err, r) => {
      result[i] = r
      count++
      if(count == arr.length) // 如果将 `cb(null, result)` 放在 `for` 循环体中不可行，因为它在异步任务完成前检查 `count`，导致回调时机错误或不被调用。
        cb(null, result)
    })
  }
}

function series(tasks, allDone) {
  var count = 0
  var i = 0
  function done1() {
    count++
    i++
    if(count == tasks.length)
      allDone()
    else
      tasks[i](done1)
  }
  if(tasks.length == 0)
    allDone()
  else
    tasks[0](done1)
}
