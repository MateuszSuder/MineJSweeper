"use strict";
//This file contains html/css related functions, which basicly create the game
let rows = 10;
let columns = 10;
function createBoard(width, height) {
    let table = document.createElement("table");
    for (let i = 1; i <= width; i++) {
        let tr = document.createElement("tr");
        for (let j = 1; j <= height; j++) {
            let td = document.createElement("td");
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", j + "," + i);
            td.appendChild(square);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let game = document.getElementById("game");
    game.appendChild(table);
}
function resize(width, height) {
    let square = document.getElementsByClassName("square");
    let arr = Array.from(square);
    for (let index in arr) {
        arr[index].style.width = "1vw";
        let h = (arr[index].clientWidth).toString() + "px";
        arr[index].style.height = h;
        arr[index].style.borderWidth = "0.2vw";
    }
}
$(window).contextmenu(function (e) {
    e.preventDefault();
});
createBoard(columns, rows);
resize(columns, rows);
