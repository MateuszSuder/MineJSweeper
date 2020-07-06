"use strict";
class Square {
    constructor() {
        this.mined = false;
    }
}
class Board {
    constructor(rows, columns, bombs) {
        this.board = [];
        this.firstClicked = false;
        this.createBoard(rows, columns);
        console.log(this.board);
    }
    createBoard(r, c) {
        for (let i = 0; i < r; i++) {
            this.board[i] = [];
            for (let j = 0; j < c; j++) {
                this.board[i][j] = new Square;
            }
        }
    }
    rollMinedSquares(minesAmount) {
    }
}
console.log(ranInt(1, 20, 20, false));
let b = new Board(10, 10, 10);
