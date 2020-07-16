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
        let clickToNumber;
        console.log(fClick);
        clickToNumber = (parseInt(fClick[0]) - 1) * columns + parseInt(fClick[1]);
        console.log(clickToNumber);
        let bombDraw = ranInt(1, this.rows * this.columns, this.bombs, false, clickToNumber);
        for (let o = 0; o < bombDraw.length; o++) {
            let bomb = placeIntIn2D(bombDraw[o], this.rows, this.columns);
            this.board[bomb[0]][bomb[1]].mined = true;
            this.board[bomb[0]][bomb[1]].content = "b";
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
                $(arr[index]).append(bomb);
            }
        }
    }
}
$(".square").contextmenu(function () {
    let position = (this.id).split(",");
    if (b.board[parseInt(position[0]) - 1][parseInt(position[1]) - 1].state == State.default) {
        let flag = new Image();
        flag.src = "img/flag.png";
        $(flag).attr("id", "flag");
        this.appendChild(flag);
        b.board[parseInt(position[0]) - 1][parseInt(position[1]) - 1].state = State.flagged;
    }
    else if (b.board[parseInt(position[0]) - 1][parseInt(position[1]) - 1].state == State.flagged) {
        $(this).children().remove();
        b.board[parseInt(position[0]) - 1][parseInt(position[1]) - 1].state = State.default;
    }
    else {
        return 0;
    }
});
$(".square").click(function () {
    let position = (this.id).split(",");
    if (b.board[parseInt(position[0]) - 1][parseInt(position[1]) - 1].state == State.default) {
        $(this).css({ "border-style": "solid", "border-color": "gray" });
        if (!b.firstClicked) {
            b.mineTheBoard(position);
            b.firstClicked = true;
            b.board[parseInt(position[0]) - 1][parseInt(position[1]) - 1].state = State.clicked;
            b.showAll();
        }
        else {
            b.board[parseInt(position[0]) - 1][parseInt(position[1]) - 1].state = State.clicked;
        }
    }
    else {
        return 0;
    }
});
let b = new Board(rows, columns, bombs);
