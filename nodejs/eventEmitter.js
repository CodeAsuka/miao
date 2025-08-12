//面试官有可能会让你实现这么一个函数
//node.js和浏览器DOM对象的事件监听就是继承自它的
class EventEmitter {
  constructor() {
    this._eventMaps = {}
    
  }
  on(eventName, handler) {
    if(!this._eventMaps[eventName]) {
      this._eventMaps[eventName] = []
    }
    this._eventMaps[eventName].push(handler)
  }

  emit(eventName, ...args) {
    var handlers = this._eventMaps[eventName]
    if(!handlers) {
      return false
    }
    for(var h of handlers) {
      h(...args)
    }
    return true
  }
}

//当然还有HttpServer
class HttpServer extends EventEmitter {
  constructor() {
    super()
    this.tcpServer = new TCPServer()
    this.tcpServer('connection', (socket) => {
      socket.on('data', data => {
        if(data是http报文) {
          var req = new Request(socket)
          var res = new Response(socket)
          this.emit('request', req, res)
        }
      })
    })
  }
}