//实现一个/author接口，根据请求头的accept返回不同格式的响应体


server.on('request', (req,res) => {
  if(req.url == '/author') {
    var accept = req.headers['accept']
    if(accept == 'text/plain') {
      res.writeHead(200, {
        'content-type': 'text/plain; charset=utf8'
      })
      res.end("I'm Marjin Haveberk ......")
    } else if (accept == 'text/html') {
      res.writeHead(200, {
        'content-type': 'text/html; charset=utf8'
      })
      res.end(`
        <h1>Author</h1>
        <span>Marjin</span>
        <div>intro...</div>
      `)
    } else if (accept == 'application/json') {
      res.writeHead(200, {
        'content-type': 'application/json; charset=utf8'
      })
      res.end(JSON.stringify({
        name: 'Marjin Haveberk',
        book: 'eloquent javascript'
      }))
    } else {
      res.end('unkown request type')
    }
  } else {
    res.end()
  }
})