
class Square{
    private mined: boolean;
    constructor(){
        this.mined = false;
    }
}

class Board{
    private board: Square[][] = [];
    constructor(rows: number, columns: number, bombs: number){
        this.createBoard(rows, columns);
        console.log(this.board);
    }
    createBoard(r: number, c: number){
        for(let i=0; i<r; i++){
            this.board[i] = [];
            for(let j=0; j<c; j++){
                this.board[i][j] = new Square;
            }
        }
    }
    rollMinedSquares(minesAmount: number){

    }
}

let b = new Board(10, 10, 10);