const express = require('express')
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const io = require("socket.io")(http)
app.use(express.static(path.join(__dirname, 'demo3')))

const PORT = 3000
let clientCount = 0
let socketMap = {}
let bindListener = function (socket, event) {
    socket.on(event, function (data) {
        // console.log("event data", event, data)
        if (socket.clientNum % 2 == 0) {
            socketMap[socket.clientNum - 1].emit(event, data)
        } else {
            socketMap[socket.clientNum + 1].emit(event, data)
        }
    })

}
io.on('connection', function (socket) {
    clientCount++
    socket.clientNum = clientCount
    socketMap[clientCount] = socket
    if (clientCount % 2 == 1) {
        socket.emit('waiting', 'waiting for another person')
    } else {
        socket.emit('start')
        socketMap[(clientCount - 1)].emit('start')
    }
    bindListener(socket, 'init')
    bindListener(socket, 'next')
    // bindListener(socket, 'setTime')

    bindListener(socket, 'rotate')
    bindListener(socket, 'right')
    bindListener(socket, 'down')
    bindListener(socket, 'left')
    bindListener(socket, 'fall')
    bindListener(socket, 'fixed')
    bindListener(socket, 'line')
    bindListener(socket, 'time')
    bindListener(socket, 'lose')
    // bindListener(socket, 'setTime')
    socket.on('disconnect', function () {
        // clientCount--
        if (socket.clientNum % 2 == 0) {
            if (socketMap[socket.clientNum - 1]) {
                socketMap[socket.clientNum - 1].emit('leave')
            }
        } else {

            if (socketMap[socket.clientNum + 1]) {
                socketMap[socket.clientNum + 1].emit('leave')
            }
        }
        delete (socketMap[socket.clientNum])
    })
})


http.listen(3003, () => console.log('Example app listening on port 3003!'))