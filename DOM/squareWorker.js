

// for(var i = 0 ; i < 30 ; i++) {
//   sleep(1000)
//   console.log(i + 'worker')
// }

function sleep(time) {
  var start = Date.now()
  while(Date.now() - start < time) {
       
  }
}

globalThis.addEventListener('message', e => {
  var data = e.data
  var result = data * data

  postMessage(result)
})