var Square = function () {
    // this.data = [
    //     [0, 0, 2, 0],
    //     [0, 0, 2, 0],
    //     [0, 0, 2, 0],
    //     [0, 0, 2, 0]
    // ]
    this.origin = {
        x: 0,
        y: 0
    }
    this.dir = 0
}
Square.prototype.canRotate = function (isValid) {
    var dir = (this.dir + 1) % 4
    // if (dir == 4) {
    //     dir = 0
    // }
    var data = this.rotates[dir]
    return isValid(this.origin, data)

}
Square.prototype.rotate = function (num) {
    if (!num) num = 1
    // var dir = this.dir + 1
    // if (dir == 4) {
    //     dir = 0
    // }
    this.dir = (this.dir + num) % 4
    this.data = this.rotates[this.dir]

}
Square.prototype.canDown = function (isValid) {
    var text = {}
    text.x = this.origin.x + 1
    text.y = this.origin.y
    return isValid(text, this.data)
}
Square.prototype.down = function () {
    this.origin.x = this.origin.x + 1
}
Square.prototype.canLeft = function (isValid) {
    var text = {}
    text.x = this.origin.x
    text.y = this.origin.y - 1
    return isValid(text, this.data)
}
Square.prototype.left = function () {
    this.origin.y = this.origin.y - 1
}

Square.prototype.canRight = function (isValid) {
    var text = {}
    text.x = this.origin.x
    text.y = this.origin.y + 1
    return isValid(text, this.data)
}
Square.prototype.right = function () {
    this.origin.y = this.origin.y + 1
}