
addEventListener('message', e => {
  var re = e.data.re
  var string = e.data.string
  var matches = []
  var match
  var lastLastIndex = 0
  var matchIndex = 0
  while(match = re.exec(string)) {
    matches.push(match)
    lastLastIndex = re.lastIndex
    if(match[0].length == 0)
      re.lastIndex++
    if(re.global == false)
      break
    matchIndex++
  }
  postMessage(matches)
})