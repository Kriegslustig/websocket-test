addEventListener('load', function () {
  if(reqUri = getRequestURIFromString(location.href))
    readWSStream(reqUri, appendToBody)
  else
    appendToBody('No URL given <br>')
})

function readWSStream (requestURI, callback) {
  var conn = new WebSocket('ws://' + requestURI, 'echo-protocol')
  conn.onmessage = callerWithKey(callback, 'data')
}

function callerWithKey(someFunct, key) {
  return function (someObject) {
    someFunct (someObject[key])
  }
}

function appendToBody (someString) {
  return document.body.innerHTML += someString
}

function getRequestURIFromString (someString) {
  var uri = someString.split('#')
  return uri.length > 1 ? uri[1] : false
}
