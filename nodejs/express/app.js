const express = require('express')
const port = 8005
const app = express()

// 中间件 middleware
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.use((req, res, next) => {
  res.end('aaa')
})

// app.use((err, req, res, next) => {
//如果use调用有四个参数(可以通过functionName.length读出来)那么第一个参数就是err
//next()里面如果传参数那就是抛错，错误会一直贯穿中间件直到被四个参数的use接住
// })

app.listen(port, () => {
  console.log('listening on port', port)
})