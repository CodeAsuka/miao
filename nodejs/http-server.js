var http = require('http')
var server = http.createServer()
server.on('request', (request, response) => {
  console.log(request.method, request.url)
  response.writeHead(200,{'Content-Type': 'text/html'})
  response.write('<h1>Hello!</h1><p>You asked for <conde>' + request.url + '</code></p.')
  response.end()
})
server.listen(8000, () => {
  console.log('listening on port', 8000)
})