const net = require('net')

const port = 55666

const server = net.createServer(socket => {
  socket.on('data', data => {
    var lines = data.toString().split('\r\n') //win的回车是\r\n,linux的回车是\n,mac是\r。
    var firstLine = lines.shift()            //这是操作系统层面的，这里我们要用node.js,所以统一使用\r\n
    
    var [method, url] = firstLine.split(' ')

    console.log(method, url)
    console.log(data.toString())

    if (url == '/time') {
      socket.write('HTTP/1.1 200 OK\r\n')
      socket.write('Date: hfiuwhfiuew' + new Date() + '\r\n')
      socket.write('Content-Type: text/html; charset=UTF-8\r\n')
      // socket.write('Content-Length: 20\r\n')
      socket.write('\r\n')
      socket.write('' + new Date())
      socket.end()
    } else if (url == '/red') {
      socket.write('HTTP/1.1 200 OK\r\n')
      socket.write('Date: hfiuwhfiuew' + new Date() + '\r\n')
      socket.write('Content-Type: text/html; charset=UTF-8\r\n')
      // socket.write('Content-Length: 20\r\n')
      socket.write('\r\n')
      socket.write('<html><link rel="stylesheet" href="aa.css"></html>')
      socket.end()
    } else if(url == '/aa.css') {
      socket.write('HTTP/1.1 200 OK\r\n')
      socket.write('Date: hfiuwhfiuew' + new Date() + '\r\n')
      socket.write('Content-Type: text/css; charset=UTF-8\r\n')
      // socket.write('Content-Length: 20\r\n')
      socket.write('\r\n')
      socket.write('html {background: red}')
      socket.end()
    } else { 
      socket.write('HTTP/1.1 200 OK\r\n')
      socket.write('Date: hfiuwhfiuew' + new Date() + '\r\n')
      socket.write('Content-Type: text/html; charset=UTF-8\r\n')
      // socket.write('Content-Length: 20\r\n')
      socket.write('\r\n')
      socket.write('<h1>Asuka</h1>' + new Date())
      socket.end()
    }
 
  })
  socket.on('error', () => {
    socket.end()
  })
})

server.listen(port, () => {
  console.log('server listening on port', port)
})
