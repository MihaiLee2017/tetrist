
var socket = io("http://localhost:3003")
var local = new Local(socket)
// local.start()
var remote = new Remote(socket)
socket.on('waiting', function (str) {
    document.querySelector("#waiting").innerHTML = str
})
// socket.on('waiting', function (str) {
//     document.querySelector("#waiting").innerHTML = str
// })
// remote.start(2, 2)
// remote.bindEvents()