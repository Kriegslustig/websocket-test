addEventListener('load', function () {
  if(reqParams = getRequestParamsFromString(location.href)) {
    readWSStream(reqParams[0], reqParams[1], appendToBody)
  } else {
    appendToBody('No URL given <br>')
  }
})

function readWSStream (requestURI, socketProto, callback) {
  var conn = new WebSocket(socketProto + '://' + requestURI, 'echo-protocol')
  conn.onmessage = callerWithKey(callback, 'data')
  conn.onerror = errorHandler
}

function callerWithKey(someFunct, key) {
  return function (someObject) {
    someFunct (someObject[key])
  }
}

function errorHandler (error) {
  appendToBody(error)
  console.log(error)
}

function appendToBody (someString) {
  return document.body.innerHTML += someString
}

function getRequestParamsFromString (someString) {
  var params = someString.split('#')
  return params.length > 1 ? [params[1], params[2]] : false
}
