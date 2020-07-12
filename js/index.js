"use strict";
//This file contains main classes, functions for the game
var State;
(function (State) {
    State[State["default"] = 0] = "default";
    State[State["flagged"] = 1] = "flagged";
    State[State["clicked"] = 2] = "clicked";
    State[State["questionMark"] = 3] = "questionMark";
})(State || (State = {}));
let flag = new Image();
flag.src = "img/flag.png";
class Square {
    constructor() {
        this.mined = false;
        this.state = State.default;
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
        this.mineTheBoard();
    }
    createBoard() {
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.columns; j++) {
                this.board[i][j] = new Square();
            }
        }
    }
    mineTheBoard() {
        let bombDraw = ranInt(1, this.rows * this.columns, this.bombs, false);
        for (let o = 0; o < bombDraw.length; o++) {
            let bomb = placeIntIn2D(bombDraw[o], this.rows, this.columns);
            this.board[bomb[0]][bomb[1]].mined = true;
        }
    }
}
$(".square").contextmenu(function () {
    let position = (this.id).split(",");
    b.board[parseInt(position[0]) - 1][parseInt(position[1]) - 1].state = State.flagged;
    this.appendChild(flag);
});
let b = new Board(10, 10, 10);
