"use strict";
class Square {
    constructor() {
        this.mined = false;
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
        console.log(this.board);
    }
}
let b = new Board(10, 10, 10);
