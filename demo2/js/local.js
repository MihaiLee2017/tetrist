var Local = function () {
    var game
    var INTERVAL = 200
    var timer = null
    var isOver = false
    var timeCount = 0
    var time = 0
    var bindKeyEvent = function () {
        document.onkeydown = function (e) {
            if (e.keyCode == 38) {  // up
                game.rotate()
            } else if (e.keyCode == 39) { // right
                game.right()
            } else if (e.keyCode == 40) { // down
                game.down()
            } else if (e.keyCode == 37) { // left
                game.left()
            } else if (e.keyCode == 32) { // space
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
        game.init(doms, performNextType(), performNextDiv())
        bindKeyEvent()
        game.performNext(performNextType(), performNextDiv())
        timer = setInterval(move, INTERVAL)
    }
    // 移动
    var move = function () {
        timeFunc()
        if (!game.down()) {
            game.fixed()
            game.checkClear()
            isOver = game.checkGameOver()
            if (isOver) {
                stop()
                game.gameOver()
            } else {
                game.performNext(performNextType(), performNextDiv())
            }
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
            game.setTime(time)
        }
    }
    this.start = start
}