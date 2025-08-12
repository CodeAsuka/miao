import a from './a.js'

// console.log(a) 直接这样log不出来，两个文件相互依赖，得等a.js也加载完

export default 'bbbbb'

setTimeout(() => {
  console.log(a)
}, 1000) //1s一般都加载完了，那么就可以读到了