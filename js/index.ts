
class Square{
    private mined: boolean;
    constructor(){
        this.mined = false;
    }
}

class Board{
    private board: Square[][] = [];
    private firstClicked = false;
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
console.log(ranInt(1, 20, 20, false))
let b = new Board(10, 10, 10);