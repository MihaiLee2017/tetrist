var Local = function (socket) {
    var game
    var INTERVAL = 200
    var timer = null
    var isOver = false
    var timeCount = 0
    var time = 0
    var bindKeyEvent = function () {
        document.onkeydown = function (e) {
            if (e.keyCode == 38) {  // up
                socket.emit('rotate')
                game.rotate()
            } else if (e.keyCode == 39) { // right
                socket.emit('right')
                game.right()
            } else if (e.keyCode == 40) { // down
                socket.emit('down')
                game.down()
            } else if (e.keyCode == 37) { // left
                socket.emit('left')
                game.left()
            } else if (e.keyCode == 32) { // space
                socket.emit('fall')
                game.fall()
            } else if (e.keyCode == 27) { // pause
                stop()
            } else if (e.keyCode == 13) { // begin
                begin()
            }
        }
    }
    var start = function () {
        var doms = {
            gameDiv: document.querySelector("#local_game"),
            nextDiv: document.querySelector("#local_next"),
            timeDiv: document.querySelector("#local_time"),
            scoreDiv: document.querySelector("#local_score"),
            resultDiv: document.querySelector("#local_result")
        }
        game = new Game()
        var type = performNextType()
        var div = performNextDiv()
        game.init(doms, type, div)
        socket.emit('init', { type: type, div: div })
        bindKeyEvent()
        var t = performNextType()
        var d = performNextDiv()
        game.performNext(t, d)
        socket.emit("next", { type: t, div: d })
        timer = setInterval(move, INTERVAL)
    }
    // 移动
    var move = function () {
        timeFunc()
        if (!game.down()) {
            game.fixed()
            socket.emit('fixed')
            var line = game.checkClear()
            if (line > 0) {
                socket.emit('line', line)
                game.addScore(line)
            }
            isOver = game.checkGameOver()
            if (isOver) {
                game.gameOver(true)
                document.querySelector("#remote_result").innerText = 'you win'
                socket.emit('lose')
                stop()
            } else {
                var t = performNextType()
                var d = performNextDiv()
                socket.emit('next', { type: t, div: d })
                game.performNext(t, d)
            }
        } else {
            socket.emit('down')
        }
    }
    var stop = function () {
        if (timer) {
            clearInterval(timer)
            timer = null
        }
    }
    var begin = function () {
        if (!isOver) {
            if (!timer) {
                timer = setInterval(move, INTERVAL)
            }
        } else {
            start()
        }
    }
    var performNextType = function () {
        return Math.ceil(Math.random() * 7) - 1
    }
    var performNextDiv = function () {
        return Math.ceil(Math.random() * 4) - 1
    }
    var timeFunc = function () {
        timeCount = timeCount + 1
        if (timeCount == 5) {
            timeCount = 0
            time = time + 1
            socket.emit('time', time)
            game.setTime(time)
        }
    }
    this.start = start
    socket.on('start', function () {
        var count = 3
        var starter = null
        // document.getElementById('waiting').innerHTML = count + '秒后开始'
        // starter = setInterval(function () {
        //     count--
        //     document.getElementById('waiting').innerHTML = count + '秒后开始'
        //     if (count == 0) {
        //         clearInterval(starter)
        //         document.getElementById('waiting').innerHTML = '开始'
        //         start()
        //     }
        // }, 1000)
        document.getElementById('waiting').innerHTML = '开始'
        start()
    })
    socket.on('lose', function () {
        game.gameOver(false)
        stop()
    })
    socket.on('leave', function () {
        document.querySelector("#local_result").innerText = "对方已离开"
        document.querySelector("#remote_result").innerText = "已离开"
        stop()
    })
}