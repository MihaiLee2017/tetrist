var Remote = function (socket) {
    var game
    var bindEvents = function () {
        socket.on('init', function (data) {
            start(data.type, data.div)
        })
        socket.on('next', function (data) {
            game.performNext(data.type, data.div)
            console.log("event data", event, data)
        })
        socket.on('rotate', function () {
            game.rotate()
        })
        socket.on('right', function () {
            game.right()
        })
        socket.on('down', function () {
            game.down()
        })
        socket.on('left', function () {
            game.left()
        })
        socket.on('fall', function () {
            game.fall()
        })
        socket.on('fixed', function () {
            game.fixed()
        })
        socket.on('line', function (line) {
            game.checkClear()
            game.addScore(line)
        })
        socket.on('time', function (time) {
            game.setTime(time)
        })
        socket.on('lose', function () {
            game.gameOver(true)
        })
        socket.on('addTailLines', function (data) {
            game.addTailLines(data)
        })
    }
    var start = function (type, dir) {
        var doms = {
            gameDiv: document.querySelector("#remote_game"),
            nextDiv: document.querySelector("#remote_next"),
            timeDiv: document.querySelector("#remote_time"),
            scoreDiv: document.querySelector("#remote_score"),
            resultDiv: document.querySelector("#remote_result")
        }
        game = new Game()
        game.init(doms, type, dir)
    }
    // this.start = start
    // this.bindEvents = bindEvents
    bindEvents()
}