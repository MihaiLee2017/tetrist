var Game = function () {
    // dom 元素
    var gameDiv
    var nextDiv
    var timeDiv
    var scoreDiv
    var resultDiv
    // 分数
    var totalScore = 0
    // 
    var isOver = false
    // 游戏矩阵
    var nextData = [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    var gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    // 当前方块
    var cur
    // 下一个方块
    var next
    // divs
    var nextDivs = []
    var gameDivs = []
    // 初始化
    var initDiv = function (container, data, divs, isMain) {
        var num = 0
        if (isMain) {
            num = 4
        }
        for (var i = 0; i < data.length; i++) {
            var div = []
            for (var j = 0; j < data[0].length; j++) {
                var newNode = document.createElement('div')
                newNode.className = 'none'
                newNode.style.top = ((i - num) * 20) + 'px'
                newNode.style.left = (j * 20) + 'px'
                container.appendChild(newNode)
                div.push(newNode)
            }
            divs.push(div)
        }
    }
    // 刷新div
    var refresDiv = function (data, divs) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] == 0) {
                    divs[i][j].className = 'none'
                } else if (data[i][j] == 1) {
                    divs[i][j].className = 'done'
                } else if (data[i][j] == 2) {
                    divs[i][j].className = 'current'
                }
            }
        }
    }
    // 检测点是否合法
    var check = function (pos, x, y) {
        if (pos.x + x < 0) {
            return false
        } else if (pos.x + x >= gameData.length) {
            return false
        } else if (pos.y + y < 0) {
            return false
        } else if (pos.y + y >= gameData[0].length) {
            return false
        } else if (gameData[pos.x + x][pos.y + y] == 1) {
            return false
        }
        return true
    }
    // 检测数据是否合法
    var isValid = function (pos, data) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] != 0) {
                    if (!check(pos, i, j)) {
                        return false
                    }
                }
            }
        }
        return true
    }
    // 清楚数据
    var clearDate = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    gameData[i + cur.origin.x][j + cur.origin.y] = 0
                }
            }
        }
    }
    // 设置数据
    var setDate = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    gameData[i + cur.origin.x][j + cur.origin.y] = cur.data[i][j]
                }
            }
        }
    }
    // 下一个方块
    var performNext = function (type, dir) {
        cur = next
        // next = new SquareFactory().make(4, 0)
        next = SquareFactory.prototype.make(type, dir)
        setDate()
        refresDiv(gameData, gameDivs)
        refresDiv(next.data, nextDivs)
    }
    // 下落到底部时
    var fixed = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    if (gameData[i + cur.origin.x][j + cur.origin.y] == 2) {
                        gameData[i + cur.origin.x][j + cur.origin.y] = 1
                    }
                }
            }
        }
        refresDiv(gameData, gameDivs)
    }
    // 消除
    var checkClear = function () {
        var count = 0
        let len = gameData.length
        for (var i = len - 1; i > 0; i--) {
            var canClear = gameData[i].every(function (item) {
                return item == 1
            })
            if (canClear) {
                for (var j = i; j > 0; j--) {
                    for (var k = 0; k < gameData[0].length; k++) {
                        gameData[j][k] = gameData[j - 1][k]
                    }
                }
                count = count + 1
                i++
                // refresDiv(gameData, gameDivs)
            }
        }
        refresDiv(gameData, gameDivs)
        return count
        // addScore(count)
    }
    // 分数
    var addScore = function (count) {
        let score = 0
        switch (count) {
            case 1:
                score = 10;
                break;
            case 2:
                score = 20;
                break;
            case 3:
                score = 40;
                break;
            case 3:
                score = 60;
                break;
            default:
                break;
        }
        totalScore = totalScore + score
        scoreDiv.innerText = totalScore

    }
    // 计时间
    var setTime = function (time) {
        timeDiv.innerText = time
        // if (time % 5 == 0) {
        //     var lines = generataBottomLine(1)
        //     addTailLines(lines)
        // }
    }
    // 结束
    var checkGameOver = function () {
        isOver = gameData[3].some(item => {
            return item == 1 || item == 2
        })
        return isOver
    }
    var gameOver = function (isOver) {
        if (isOver) {
            resultDiv.innerText = 'you lost'
            // alert("you lost")
        } else {
            resultDiv.innerText = 'you win'
            // alert("you win")
        }
    }
    // 随机生成底部行
    var generataBottomLine = function (num) {
        var lines = []
        for (var i = 0; i < num; i++) {
            var line = []
            for (j = 0; j < gameData[0].length; j++) {
                line.push(Math.ceil(Math.random() * 2) - 1)
            }
            lines.push(line)
        }
        return lines
    }
    // 底部加行
    var addTailLines = function (lines) {
        for (var i = 0; i < gameData.length - lines.length; i++) {
            gameData[i] = gameData[i + lines.length]
        }
        for (var i = 0; i < lines.length; i++) {
            startLine = gameData.length - lines.length
            gameData[startLine + i] = lines[i]
        }
        cur.origin.x = cur.origin.x - lines.length
        if (cur.origin.x < 0) {
            cur.origin.x = 0
        }
        refresDiv(gameData, gameDivs)
    }
    // 变形
    var rotate = function () {
        if (cur.canRotate(isValid)) {
            clearDate()
            cur.rotate()
            setDate()
            refresDiv(gameData, gameDivs)
        }
    }
    // 下移
    var down = function () {
        if (cur.canDown(isValid)) {
            clearDate()
            // cur.origin.x = cur.origin.x + 1
            cur.down()
            setDate()
            refresDiv(gameData, gameDivs)
            return true
        } else {
            return false
        }
    }
    // 左移动
    var left = function () {
        if (cur.canLeft(isValid)) {
            clearDate()
            // cur.origin.x = cur.origin.x + 1
            cur.left()
            setDate()
            refresDiv(gameData, gameDivs)
        }
    }
    // 右移动
    var right = function () {
        if (cur.canRight(isValid)) {
            clearDate()
            // cur.origin.x = cur.origin.x + 1
            cur.right()
            setDate()
            refresDiv(gameData, gameDivs)
        }
    }
    var init = function (doms, type, dir) {
        gameDiv = doms.gameDiv
        nextDiv = doms.nextDiv
        timeDiv = doms.timeDiv
        scoreDiv = doms.scoreDiv
        resultDiv = doms.resultDiv
        // cur = new Square()
        // cur = SquareFactory.prototype.make(0, 2)
        // next = SquareFactory.prototype.make(3, 3)
        // cur = new SquareFactory().make(0, 2)
        next = new SquareFactory().make(type, dir)
        initDiv(gameDiv, gameData, gameDivs, true)
        initDiv(nextDiv, nextData, nextDivs)
        // setDate()
        // refresDiv(gameData, gameDivs)
        // refresDiv(next.data, nextDivs)
    }
    this.init = init
    this.down = down
    this.right = right
    this.left = left
    this.rotate = rotate
    this.fall = function () { while (down()) { down() } }
    this.fixed = fixed
    this.performNext = performNext
    this.checkClear = checkClear
    this.checkGameOver = checkGameOver
    this.setTime = setTime
    this.gameOver = gameOver
    this.addTailLines = addTailLines
    this.addScore = addScore
}