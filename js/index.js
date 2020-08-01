"use strict";
//This file contains main classes, functions for the game
var State;
(function (State) {
    State[State["default"] = 0] = "default";
    State[State["flagged"] = 1] = "flagged";
    State[State["clicked"] = 2] = "clicked";
    State[State["questionMark"] = 3] = "questionMark";
})(State || (State = {}));
class Square {
    constructor() {
        this.mined = false;
        this.state = State.default;
        this.content = -1;
    }
}
class Board {
    constructor(r, c, b) {
        this.board = [];
        this.firstClicked = false;
        this.rows = r;
        this.columns = c;
        this.bombs = b;
        this.createBoard();
    }
    createBoard() {
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.columns; j++) {
                this.board[i][j] = new Square();
            }
        }
    }
    mineTheBoard(fClick) {
        let clickToNumber = [];
        for (let c = -1; c <= 1; c++) {
            for (let v = -2; v <= 2; v++) {
                if ((parseInt(fClick[0]) - 1 + c < 0 || (parseInt(fClick[0])) - 1 + c >= this.rows || parseInt(fClick[1]) - 1 + v < 0 || parseInt(fClick[1]) - 1 + v >= this.columns)) {
                    continue;
                }
                clickToNumber.push((parseInt(fClick[0]) - 1 + c) * columns + parseInt(fClick[1]) + v);
            }
        }
        let bombDraw = ranInt(1, this.rows * this.columns, this.bombs, false, clickToNumber);
        for (let o = 0; o < bombDraw.length; o++) {
            let bomb = placeIntIn2D(bombDraw[o], this.rows, this.columns);
            this.board[bomb[0]][bomb[1]].mined = true;
            this.board[bomb[0]][bomb[1]].content = "b";
        }
        for (let z = 0; z < this.rows; z++) {
            for (let x = 0; x < this.columns; x++) {
                if (this.board[z][x].mined == true) {
                    continue;
                }
                else {
                    let temp = 0;
                    //Counting bombs
                    for (let c = -1; c <= 1; c++) {
                        for (let v = -1; v <= 1; v++) {
                            if (c == 0 && v == 0) {
                                continue;
                            }
                            else {
                                if (z + c < 0 || z + c >= this.rows || x + v < 0 || x + v >= this.columns) {
                                    continue;
                                }
                                else {
                                    if (this.board[z + c][x + v].mined == true)
                                        temp++;
                                }
                            }
                        }
                    }
                    this.board[z][x].content = temp;
                }
            }
        }
    }
    showAll() {
        let square = document.getElementsByClassName("square");
        let arr = Array.from(square);
        for (let index in arr) {
            let in2D = placeIntIn2D(parseInt(index) + 1, rows, columns);
            $(arr[index]).css({ "border-style": "solid", "border-color": "gray" });
            if (this.board[in2D[0]][in2D[1]].content == "b") {
                let bomb = new Image();
                bomb.src = "img/bomb.png";
                $(arr[index]).html(bomb);
            }
            else {
                $(arr[index]).html((this.board[in2D[0]][in2D[1]].content).toString());
            }
        }
    }
    reveal(y, x) {
        let square = document.getElementsByClassName("square");
        let arr = Array.from(square);
        let toInt = y * this.columns + x;
        if (this.board[y][x].content == "b") {
            let bomb = new Image();
            bomb.src = "img/bomb.png";
            $(arr[toInt]).append(bomb);
            $(arr[toInt]).css("background-color", "red");
            lost = true;
            console.log("You lost");
            this.showAll();
        }
        else if (this.board[y][x].content == 0) {
            $(arr[toInt]).append(this.board[y][x].content.toString());
            for (let c = -1; c <= 1; c++) {
                for (let v = -1; v <= 1; v++) {
                    if (c == 0 && v == 0) {
                        continue;
                    }
                    else {
                        if (y + c < 0 || y + c >= this.rows || x + v < 0 || x + v >= this.columns) {
                            continue;
                        }
                        else {
                            if (this.board[y + c][x + v].state == State.default) {
                                $(arr[(y + c) * this.columns + (x + v)]).click();
                            }
                        }
                    }
                }
            }
        }
        else {
            $(arr[toInt]).append(this.board[y][x].content.toString());
        }
    }
}
$(".square").contextmenu(function () {
    let position = (this.id).split(",");
    if (b.board[parseInt(position[0]) - 1][parseInt(position[1]) - 1].state == State.default && !lost) {
        let flag = new Image();
        flag.src = "img/flag.png";
        $(flag).attr("id", "flag");
        this.appendChild(flag);
        b.board[parseInt(position[0]) - 1][parseInt(position[1]) - 1].state = State.flagged;
        let bo = parseInt($("#bombs").text()) - 1;
        if (bo < 10) {
            $("#bombs").html("00" + bo);
        }
        else if (bo < 100 && bo >= 10) {
            $("#bombs").html("0" + bo);
        }
        else {
            $("#bombs").html(bo.toString());
        }
    }
    else if (b.board[parseInt(position[0]) - 1][parseInt(position[1]) - 1].state == State.flagged && !lost) {
        $(this).children().remove();
        b.board[parseInt(position[0]) - 1][parseInt(position[1]) - 1].state = State.default;
        let bo = parseInt($("#bombs").text()) + 1;
        if (bo < 10) {
            $("#bombs").html("00" + bo);
        }
        else if (bo < 100 && bo >= 10) {
            $("#bombs").html("0" + bo);
        }
        else {
            $("#bombs").html(bo.toString());
        }
    }
    else {
        return 0;
    }
});
$(".square").click(function () {
    if (lost) {
        return 0;
    }
    else {
        let position = (this.id).split(",");
        if (b.board[parseInt(position[0]) - 1][parseInt(position[1]) - 1].state == State.default) { //At unmarked, not clicked square
            $(this).css({ "border-style": "solid", "border-color": "gray" });
            if (!b.firstClicked) { //If it is first click
                b.mineTheBoard(position);
                b.firstClicked = true;
                b.board[parseInt(position[0]) - 1][parseInt(position[1]) - 1].state = State.clicked;
                b.reveal(parseInt(position[0]) - 1, parseInt(position[1]) - 1);
                let t = setInterval(timer, 1000);
            }
            else {
                b.board[parseInt(position[0]) - 1][parseInt(position[1]) - 1].state = State.clicked;
                b.reveal(parseInt(position[0]) - 1, parseInt(position[1]) - 1);
            }
        }
        else {
            return 0;
        }
    }
});
$("#face").click(function () {
    b.showAll();
});
function timer() {
    if (!lost) {
        time++;
        if (time < 10) {
            $("#time").html("00" + time);
        }
        else if (time < 100 && time >= 10) {
            $("#time").html("0" + time);
        }
        else if (time <= 999 && time >= 100) {
            $("#time").html(time.toString());
        }
        else {
            $("#time").html("999");
        }
    }
}
let b = new Board(rows, columns, bombs);
