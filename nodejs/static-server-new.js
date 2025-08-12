//这是一个类似于http-server的静态服务器
//在terminal运行: node --watch ./static-server-new.js

const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const port = 8080
const server = http.createServer()

const baseDir = '/Users/yanzihang/Desktop/frontend/nodejs'

server.on('request', (req, res) => {
  console.log(req.method, req.url)

  var url = new URL(`http://asuka.com${req.url}`)
  
  var targetPath = path.join(baseDir, decodeURIComponent(url.pathname))

  fs.stat(targetPath, (err, stat) => {
    if(err) {
      res.writeHead(404)
      res.end()
    } else {
      // console.log(stat)
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
        if(url.pathname.endsWith('/')) {
          var indexPath = path.join(targetPath, 'index.html')
          fs.readFile(indexPath, (err, data) => {
            if(err) {
              fs.readdir(targetPath, {withFileTypes: true}, (err, entries) => {
                if(err) {
                  res.writeHead(500)
                  res.end()
                } else {
                  //对文件(夹)们排序,让文件夹排前面,文件排后面
                  //如果sort执行一个稳定的排序算法，那么
                  //按类型排的时候，类型相同的项相对顺序是不变的
                  entries.sort((a,b) => {
                    var ta = a.isFile()
                    var tb = b.isFile()
                    if(ta == tb) {
                      return 0
                    } else {
                      if(ta == false) {
                        return -1
                      }
                      if(tb == false) {
                        return 1
                      }
                    }
                  })
                  res.writeHead(200, {
                    'content-type': 'text/html; charset=utf8'
                  })
                  res.write(`<title>Index of ${url.pathname}</title>`)
                  res.write(`<h1>Index of ${url.pathname}</h1>`)
                  if(url.pathname !== '/') { //如果不在根目录那么就需要这个返回上级的链接
                    res.write('<div><a href="..">../</a></div>')
                  }
                  for(var entry of entries) {
                    // entry.name是文件名,entry.isFile()判断是否为文件,entry.isDirectory()判断是否为文件夹
                    res.write(`<div><a href='${entry.name}${entry.isFile() ? '' : '/'}'>${entry.name}${entry.isFile() ? '' : '/'}</a></div>`)
                  }
                  res.write(`<address>Node.js ${process.version}/ http-server server running @${req.socket.localAddress}${req.socket.localPort}</address>`)
                  res.end()
                }
              })
            } else {
              res.write(data)
              res.end()
            }
          })
        } else {
          res.writeHead(302, {
            location: url.pathname + '/' + url.search
          })
          res.end()
        }
      }
    }
  })
})
server.listen(port, () => {
  console.log(process.pid)
  console.log('Server listening on port', port)
})