var http = require('http')
var WebSocketServer = require('websocket').server

var server = new http.createServer(function (req, res) {
  res.end("hi")
}).listen(8000)

var webSocketServer = new WebSocketServer({
  httpServer: server
})

webSocketServer.on('request', function (req) {
  var connection = req.accept('echo-protocol', req.origin)
  if(!connection) {
    console.log("Connection failed")
    return false
  }
  setInterval(createRandSender(connection), 1000)
})

function genRandomInt (size) {
  return Math.round(Math.random() * size)
}

function createRandSender (conn) {
  return function () {
    conn.send(genRandomInt(1000))
  }
}
