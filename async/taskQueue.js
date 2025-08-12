class taskQueue {
  constructor() {
    this._tasks = []
    this._running = false
  }

  _startNext() {
    if(this._tasks.length > 0) {
      var task = this._tasks.shift()
      task(() => {
       this._startNext() 
      })
    } else {
      this._running = false
    }
  }

  addTask(task) {
    if(this._running == true) {
      this._tasks.push(task)
    } else {
      this._running = true
      task(() => {
       this._startNext() 
      })
    }
  }
}

// 可以最多三个任务同时进行的版本的任务列表
class taskQueue3 {
  constructor(parallelLimit = 3) {
    this._parallelLimit = parallelLimit
    this._tasks = []
    this._runningCount = 0
  }

  _startNext() {
    if(this._tasks.length > 0) {
      var task = this._tasks.shift()
      task(() => {
       this._startNext() 
      })
    } else {
      this._runningCount--
    }
  }

  addTask(task) {
    if(this._runningCount == this._parallelLimit) {
      this._tasks.push(task)
    } else {
      this._runningCount++
      task(() => {
       this._startNext() 
      })
    }
  }
}

var p =  new Promise((resolve, reject) => {
  var img = new Image()
  img.src = 'fgewiufgewiu'
  img.onload = () => {
    resolve()
  }
  img.onerror = () => {
    reject()
  }
})

