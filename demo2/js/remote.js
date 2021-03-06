var Remote = function () {
    var game
    var bindEvents = function () {
        document.getElementById('down').onclick = function () {
            game.down()
        }
        document.getElementById('left').onclick = function () {
            game.left()
        }
        document.getElementById('right').onclick = function () {
            game.right()
        }
        document.getElementById('rotate').onclick = function () {
            game.rotate()
        }
        document.getElementById('fall').onclick = function () {
            game.fall()
        }
        document.getElementById('fixed').onclick = function () {
            game.fixed()
        }
        document.getElementById('performNext').onclick = function () {
            game.performNext(2, 2)
        }
        document.getElementById('checkClear').onclick = function () {
            game.checkClear()
        }
        document.getElementById('checkGameOver').onclick = function () {
            game.checkGameOver()
        }
        document.getElementById('setTime').onclick = function () {
            game.setTime(20)
        }
        document.getElementById('addScore').onclick = function () {
            game.addScore(2)
        }
        document.getElementById('gameOver').onclick = function () {
            game.gameOver(false)
        }
        document.getElementById('addTailLines').onclick = function () {
            game.addTailLines([[0, 1, 0, 1, 0, 1, 0, 1, 0, 1]])
        }
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
    this.start = start
    this.bindEvents = bindEvents
}
