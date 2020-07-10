
enum State {default, flagged, clicked, questionMark}

class Square{
    mined: boolean;
    state: State; 
    constructor(){
        this.mined = false;
        this.state = State.default;
    }
}

class Board{
    rows: number;
    columns: number;
    bombs: number;
    private board: Square[][] = [];
    private firstClicked = false;
    constructor(r: number, c: number, b: number){
        this.rows = r;
        this.columns  = c;
        this.bombs = b;
        this.createBoard();
        this.mineTheBoard();
    }
    createBoard(){
        for(let i=0; i<this.rows; i++){
            this.board[i] = [];
            for(let j=0; j<this.columns; j++){
                this.board[i][j] = new Square();
            }
        }
    }
    mineTheBoard(){
        let bombDraw: number[] = ranInt(1, this.rows*this.columns, this.bombs, false);
        for(let o=0; o<bombDraw.length; o++){
            let bomb = placeIntIn2D(bombDraw[o], this.rows, this.columns);
            this.board[bomb[0]][bomb[1]].mined=true;
        }
    }
}

window.addEventListener("resize", function(){
    resize(columns, rows);
})

let b = new Board(10, 10, 10);

