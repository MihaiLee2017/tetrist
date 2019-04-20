var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + "/demo1/index.html");
// });
app.use(express.static(__dirname + '/demo1'));
io.on('connection', function (socket) {
    console.log('websocket has connected')
    socket.emit('message', { hello: '欢迎链接' });
    socket.on('my other event', function (data) {
        console.log(data);
        socket.emit('message', { hello: '发送成功' });
    });
    socket.on('say', function (data) {
        socket.emit('message', { hello: data });
    })
})

http.listen(3001, function () {
    console.log('listening on *:3001');
});
// var count = 0
// var ws = require("nodejs-websocket")
// var server = ws.createServer(function (conn) {
//     console.log("New connection")
//     count++
//     conn.nickName = '用户' + count
//     broadcast(conn.nickName + " come")
//     conn.on("text", function (str) {
//         console.log("Received " + str)
//         // conn.sendText(str.toUpperCase() + "!!!")
//         broadcast(str)
//     })
//     conn.on("close", function (code, reason) {
//         console.log("Connection closed")
//         broadcast(conn.nickName + " left")
//     })
//     conn.on("error", function (err) {
//         console.log("Connection err:", err)
//     })
// }).listen(4001)
// function broadcast(str) {
//     console.log("aaa")
//     server.connections.forEach(function (connect) {
//         connect.sendText(str)
//     })
// }