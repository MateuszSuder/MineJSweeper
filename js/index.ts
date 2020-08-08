//This file contains main classes, functions for the game

let b: Board;

enum State {default, flagged, clicked, questionMark}


class Square{
    mined: boolean;
    state: State;
    content: number | string;
    constructor(){
        this.mined = false;
        this.state = State.default;
        this.content = -1;

    }
}

class Board{
    rows: number;
    columns: number;
    bombs: number;
    board: Square[][] = [];
    firstClicked = false;

    constructor(r: number, c: number, b: number){
        this.rows = r;
        this.columns  = c;
        this.bombs = b;
        this.createBoard();
    }
    createBoard(){
        for(let i=0; i<this.rows; i++){

            this.board[i] = [];

            for(let j=0; j<this.columns; j++){
                this.board[i][j] = new Square();
            }
        }

        numberSquares = this.rows*this.columns - this.bombs;

    }
    mineTheBoard(fClick: string[]){
        let clickToNumber: number[] = [];

        for(let c=-1; c<=1; c++){
            for(let v=-2; v<=2; v++){
                if((parseInt(fClick[0])-1+c < 0 || (parseInt(fClick[0]))-1+c >= this.rows || parseInt(fClick[1])-1+v < 0 || parseInt(fClick[1])-1+v >= this.columns)){
                    continue;
                }

                clickToNumber.push((parseInt(fClick[0])-1+c)*columns + parseInt(fClick[1])+v);
            }
        }
        let bombDraw: number[] = ranInt(1, this.rows*this.columns, this.bombs, false, clickToNumber);
        for(let o=0; o<bombDraw.length; o++){
            let bomb = placeIntIn2D(bombDraw[o], this.rows, this.columns);
            this.board[bomb[0]][bomb[1]].mined=true;
            this.board[bomb[0]][bomb[1]].content="b";
        }

        for(let z = 0; z<this.rows; z++){
            for(let x = 0; x<this.columns; x++){
                if(this.board[z][x].mined==true){
                    continue;
                }else{
                    let temp: number = 0;
                    //Counting bombs
                    for(let c=-1; c<=1; c++){
                        for(let v=-1; v<=1; v++){
                            if(c==0 && v==0){
                                continue;
                            }else{
                                if(z+c < 0 || z+c >= this.rows || x+v < 0 || x+v >= this.columns){
                                    continue;
                                }else{
                                    if(this.board[z+c][x+v].mined == true)
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

    showAll(){
        end = true;

        let square = document.getElementsByClassName("square") as HTMLCollectionOf<HTMLElement>;
        let arr = Array.from(square);

        for(let index in arr){
            let in2D = placeIntIn2D(parseInt(index)+1, rows, columns);

            $(arr[index]).css({"border-style": "solid", "border-color": "gray"});

            if(this.board[in2D[0]][in2D[1]].content == "b"){
                let bomb = new Image();
                bomb.src = "img/bomb.png";
                $(arr[index]).html(bomb);
            }else{
                if(this.board[in2D[0]][in2D[1]].content != 0){
                    let number = new Image();
                    number.src = "img/"+this.board[in2D[0]][in2D[1]].content.toString()+".png";
                    $(arr[index]).html(number);
                }
            }
        }
    }

    reveal(y:number, x:number){
        let square = document.getElementsByClassName("square") as HTMLCollectionOf<HTMLElement>;
        let arr = Array.from(square);
        let toInt = y*this.columns + x;

        if(this.board[y][x].content == "b"){
            let bomb = new Image();
            bomb.src = "img/bomb.png";
            $(arr[toInt]).append(bomb);
            $(arr[toInt]).css("background-color","red");

            end = true;
            $("#face > img").attr("src", "img/lose.png");
            this.showAll();
            clearInterval(t);

        }else if(this.board[y][x].content == 0){
            revealedSquares++;
            for(let c=-1; c<=1; c++){
                for(let v=-1; v<=1; v++){
                    if(c==0 && v==0){
                        continue;
                    }else{
                        if(y+c < 0 || y+c >= this.rows || x+v < 0 || x+v >= this.columns){
                            continue;
                        }else{
                            if(this.board[y+c][x+v].state == State.default){
                                $(arr[(y+c)*this.columns + (x+v)]).click();
                            }
                        }
                    }
                }
            }
        }else{
            revealedSquares++;
            let number = new Image();
            number.src = "img/"+this.board[y][x].content.toString()+".png";
            $(arr[toInt]).html(number);
            //$(arr[toInt]).text(this.board[y][x].content.toString());
        }
    }
}

function timer(){
    if(!end){
        if(time<10){
            $("#time").html("00"+time);
        }else if(time<100 && time >= 10){
            $("#time").html("0"+time);
        }else if(time <= 999 && time>=100){
            $("#time").html(time.toString());
        }else{
            $("#time").html("999");
        }
        time++;
    }
}

let t = setInterval(timer);

function initalizeBoard(r: number, c: number, bo: number){
    
    $("#face > img").attr("src", "img/normal.png");

    revealedSquares = 0;
    end = false;
    time = 0;
    timer();
    clearInterval(t);

    $("table").remove();

    rows = r;
    columns = c;
    bombs = bo;

    b = new Board(rows, columns, bombs);

    createBoard(columns, rows);
}

initalizeBoard(rows, columns, bombs);

$("#game").on("click", ".square", function(){
    if(end){
        return 0;
    }else{
        let position = (this.id).split(",");
        if(b.board[parseInt(position[0])-1][parseInt(position[1])-1].state == State.default){ //At unmarked, not clicked square
            $(this).css({"border-style": "solid", "border-color": "gray"});
            if(!b.firstClicked){ //If it is first click
                b.mineTheBoard(position);
                b.firstClicked = true;
                b.board[parseInt(position[0])-1][parseInt(position[1])-1].state = State.clicked;
                b.reveal(parseInt(position[0])-1, parseInt(position[1])-1);

                if(numberSquares == revealedSquares){
                    end = true;
                    $("#face > img").attr("src", "img/win.png");
                    clearInterval(t);
                    b.showAll();
                }
                t = setInterval(timer, 1000);
            }else{
                b.board[parseInt(position[0])-1][parseInt(position[1])-1].state = State.clicked;
                b.reveal(parseInt(position[0])-1, parseInt(position[1])-1);
                if(numberSquares == revealedSquares){
                    $("#face > img").attr("src", "img/win.png");
                    end = true;
                    clearInterval(t);
                    b.showAll();
                }
            }
        }else{
            return 0;
        }
    }
})

$("#game").on("contextmenu", ".square", function(){
    let position = (this.id).split(",");
    if(b.board[parseInt(position[0])-1][parseInt(position[1])-1].state == State.default && !end){
        let flag = new Image(); 
        flag.src = "img/flag.png";
        $(flag).attr("id", "flag");
        this.appendChild(flag);

        b.board[parseInt(position[0])-1][parseInt(position[1])-1].state = State.flagged;

        let bo = parseInt($("#bombs").text())-1;

        if(bo<10){
            $("#bombs").html("00"+bo);
        }else if(bo<100 && bo >= 10){
            $("#bombs").html("0"+bo);
        }else{
            $("#bombs").html(bo.toString());
        }
    }else if(b.board[parseInt(position[0])-1][parseInt(position[1])-1].state == State.flagged && !end){
        $(this).children().remove();

        b.board[parseInt(position[0])-1][parseInt(position[1])-1].state = State.default;

        let bo = parseInt($("#bombs").text())+1;

        if(bo<10){
            $("#bombs").html("00"+bo);
        }else if(bo<100 && bo >= 10){
            $("#bombs").html("0"+bo);
        }else{
            $("#bombs").html(bo.toString());
        }
    }else{
        return 0;
    }
})

$("#game").on("mousedown", ".square", function(){
    if(!end)
        $("#face > img").attr("src", "img/click.png");
});

$("#game").on("mouseup", ".square", function(){
    if(!end)
        $("#face > img").attr("src", "img/normal.png");
});