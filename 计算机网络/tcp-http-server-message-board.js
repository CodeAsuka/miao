const net = require('net')

const port = 55666

var messages = []
const server = net.createServer(socket => {
  socket.on('data', data => {
    var lines = data.toString().split('\r\n') //win的回车是\r\n,linux的回车是\n,mac是\r。
    var firstLine = lines.shift()            //这是操作系统层面的，这里我们要用node.js,所以统一使用\r\n
    
    var [method, url] = firstLine.split(' ')

    console.log(method, url)
    console.log(data.toString())

    if (url == '/message-board') {
      socket.write('HTTP/1.1 200 OK\r\n')
      socket.write('Date: ' + new Date().toISOString() + '\r\n')
      socket.write('Content-Type: text/html; charset=UTF-8\r\n')
      // socket.write('Content-Length: 20\r\n')
      socket.write('\r\n')
      socket.write(`
        <form method="GET" action="/leave-message">
          <p>Name: <input type="text" name="name"></p>
          <p>Message:</br><textarea name="message"></textarea></p>
          <p><button type="submit">Send</button></p>
        </form>
      `)
      for(var m of messages) {
        socket.write(`
          <fieldset>
            <legend>${m.name}</legend>
            ${m.message}
          </fieldset>
        `)
      }
      socket.end()
    } else if (url.startsWith('/leave-message')) {
      var [path, query] = url.split('?')
      var msg = parseQuery(query)
      messages.push(msg)
      // 301,302都是跳转专用的状态码
      // 面试题：301和302有什么区别？
      // Grok3.5:
      // 它们的区别在于跳转的性质：
      // 301（永久重定向）：告诉浏览器和搜索引擎，页面已经永久跳到新地址。以后访问到老地址都会直接跳转到新地址，搜索引擎也会更新索引，把权重转移到新地址。适合网站迁移或URL永久变更。
      // 302（临时重定向）：表示页面只是暂时跳转到新地址，老地址未来可能还会用，搜索引擎会保留老地址的索引，权重不转移。适合临时维护或测试新页面。
      // 通俗比喻：
      // 301像搬家，告诉大家“我永久住新家了，以后都来新地址找我”；302像出差，告诉大家“我暂时在这，过几天可能回原地址”
      socket.write('HTTP/1.1 302 Found\r\n')
      socket.write('Date: ' + new Date().toISOString() + '\r\n')
      socket.write('Location: /message-board\r\n') // 这个头表示让浏览器跳转到这个地址
      socket.write('\r\n')
      socket.end()
    }else if (url == '/red') {
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

// 将一个形如a=1&b=xxx&c=uuu的查询字符串转换成一个对象
function parseQuery(query) {
  var result = {}
  var properties = query.split('&')
  for(var property of properties) {
    var p = property.split('=') // var [name, value] = property.split('=')
    result[p[0]] = decodeURIComponent(p[1]) // result[name] = decodeURIComponent(value) 这样写更直观一点，都可以的。
  }
//浏览器在发送 GET 请求的查询字符串（如 /leave-message?name=张三&message=你好）时，会对特殊字符（包括中文）进行 URI 编码，将其转换为 %XX%XX%XX 格式以确保传输安全。
//decodeURIComponent()是一个 JavaScript 函数，通过解码 URI 编码的字符串，将乱码或编码的中文（如 %E4%BD%A0）还原为正常中文，从而让评论区正确显示中文内容。
  return result
}

