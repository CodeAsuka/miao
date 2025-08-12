

var dgram = require('dgram')

var socket = dgram.createSocket('udp4')
// socket 套接字

socket.bind(11222, 'ip地址') //绑定接口,端口占两个字节，所以五位数六万以下都是可以用的

socket.send('消息', 11222, 'damiaoedu.com')

socket.on('message', function(data, info) {
  // data: 接收到的数据
  // info: 发送方的信息：ip地址与端口，数据的长度
  console.log(info.address, data.toString().slice(0, 3))
})