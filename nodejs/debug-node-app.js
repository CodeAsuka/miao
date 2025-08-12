debugger
//terminal输入
//node --inspect-brk  debug-node-app.js
//然后你就可以在devtools上调试你当前文件夹的某某文件啦
//这是因为node.js和chrome是同样的引擎，所以他们一拍即合
var a = 1
var b = 2
console.log(a + b)

//当然还可以在vscode直接打上断点然后点击左侧栏的运行和调试功能，或者把vscode下面的终端拉出来找到一个小下拉按钮里面写着调试js。
// 然后就会在终端出现调试环境，然后这时候你就用node运行一下你想要调试的文件，就会进入调试界面，不过结果来看是一样的。
//在终端的好处是方便在用运行node的时候给js文件传参数(虽然我们多数时候并不会传参数)
