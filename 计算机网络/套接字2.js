

//服务器代码
var net = require('net')

var server = net.createServer()

server.on('connection', (socket) => {
  console.log('someone comes in', socket.remoteAdress, socket.remotePort)
  
  socket.write('hello' + new Date())

  socket.end()

  socket.on('data', data => {
    console.log(socket.remoteAdress, data.toString())
    socket.write(data.toString().toUpperCase())
  })
})

server.listen(11122, () => {
  console.log('top server listening on port', 11122) //只要有人连进来就会log这一句
})



//用户端代码
var net = require('net')

var socket = net.connect(11122, 'damiaoedu.com')

// socket.on('connect', () => {

// })

socket.write('Asuka')

socket.on('data', data => {
  console.log(data.toString())
})