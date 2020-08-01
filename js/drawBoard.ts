//This file contains html/css related functions, which basicly create the game

let columns: number = 10;
let rows: number = 10;
let bombs: number = 10;
let lost: boolean = false;
let time: number = 0;

function createBoard(width: number, height: number):void{
    let table = document.createElement("table");
    for(let i = 1; i<=height; i++){
        let tr = document.createElement("tr");
        for(let j = 1; j<=width; j++){
            let td = document.createElement("td");
            let square:HTMLElement = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", i + "," +j);
            td.appendChild(square);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let game = document.getElementById("game");
    game!.appendChild(table);
    fit(width, height);
    if(bombs<10){
        $("#bombs").html("00"+bombs);
    }else if(bombs<100 && bombs >= 10){
        $("#bombs").html("0"+bombs);
    }else{
        $("#bombs").html(bombs.toString());
    }
}
$(window).resize(function(){
    fit(columns, rows);
})


function fit(width: number, height: number):void{
    if((width/height) <= (($(window).width()!)/($(window).height()!))){ //If column/rows ratio is smaller or equal to window resoultion ratio
        //We need to care more about height in that case
        let square = document.getElementsByClassName("square") as HTMLCollectionOf<HTMLElement>;
        let arr = Array.from(square);
        let size = 85/height;
        for(let index in arr){
            arr[index].style.width = size + "vh";
            arr[index].style.height = size + "vh";
            arr[index].style.borderWidth = "0.5vh";
        }
        $("#top").css("height", size+"vh");
        $("#face").css("height", size+"vh");
        $("#face").css("width", size+"vh");
        $("#bombs, #time").css("font-size", size+"vh");
    }
    else{
        //We need to care more about width in that case
        let square = document.getElementsByClassName("square") as HTMLCollectionOf<HTMLElement>;
        let arr = Array.from(square);
        let size = 85/width;
        for(let index in arr){
            arr[index].style.width = size + "vw";
            arr[index].style.height = size + "vw";
            arr[index].style.borderWidth = "0.5vw";
        }
        $("#top").css("height", size+"vw");
        $("#face").css("height", size+"vw");
        $("#face").css("width", size+"vw");
        $("#bombs, #time").css("font-size", size+"vw");
    }
}

function createOptions(){
    
}

$(window).contextmenu(function(e){
    e.preventDefault();
})

createBoard(columns, rows);