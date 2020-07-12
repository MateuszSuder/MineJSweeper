//This file contains html/css related functions, which basicly create the game

let columns = 10;
let rows = 10;

function createBoard(width: number, height: number):void{
    let table = document.createElement("table");
    for(let i = 1; i<=height; i++){
        let tr = document.createElement("tr");
        for(let j = 1; j<=width; j++){
            let td = document.createElement("td");
            let square:HTMLElement = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", j + "," +i);
            td.appendChild(square);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let game = document.getElementById("game");
    game!.appendChild(table);
}

$(window).contextmenu(function(e){
    e.preventDefault();
})

createBoard(columns, rows);
//resize(columns, rows);