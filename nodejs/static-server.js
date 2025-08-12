const http = require('http')
const fs = require('fs')

const port = 8080
const server = http.createServer()

const baseDir = '/Users/yanzihang/Desktop/frontend/nodejs'

server.on('request', (req, res) => {
  console.log(req.method, req.url)

  var targetPath = baseDir + req.url

  fs.stat(targetPath, (err, stat) => {
    if(err) {
      res.writeHead(404)
      res.end()
    } else {
      console.log(stat)
      if(stat.isFile()) {
        fs.readFile(targetPath, (err, data) => {
          if(err) {
            res.writeHead(404)
            res.end()
          } else {
            res.write(data)
            res.end()
          }
        })
      } else if(stat.isDirectory()) {
        fs.readdir(targetPath, {withFileTypes: true}, (err, entries) => {
          if(err) {
            res.writeHead(500)
            res.end()
          } else {
            res.writeHead(200, {
              'content-type': 'text/html; charset=utf8'
            })
            for(var entry of entries) {
              // entry.name是文件名,entry.isFile()判断是否为文件,entry.isDirectory()判断是否为文件夹
              res.write(`<div><a href='${entry.name}${entry.isDirectory() ? '/' : ''}'>${entry.name}${entry.isDirectory() ? '/' : ''}</a></div>`)
            }
            res.end()
          }
        })
      }
    }
  })
})
server.listen(port, () => {
  console.log(process.pid)
  console.log('Server listening on port', port)
})