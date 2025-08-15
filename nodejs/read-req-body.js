const http = require('node:http')
const server = http.createServer()

server.on('request', (req, res) => {
  var body = ''
  req.on('data', data => {
    body += data.toString()
  })

  req.on('end', () => {
    console.log('请求体是', body)
    res.end(body.toUpperCase())
  })
})

server.listen(8086, () => {
  console.log('Listening on', 8086)
})