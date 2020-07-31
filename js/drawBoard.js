"use strict";
//This file contains html/css related functions, which basicly create the game
let columns = 30;
let rows = 16;
let bombs = 90;
function createBoard(width, height) {
    let table = document.createElement("table");
    for (let i = 1; i <= height; i++) {
        let tr = document.createElement("tr");
        for (let j = 1; j <= width; j++) {
            let td = document.createElement("td");
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", i + "," + j);
            td.appendChild(square);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let game = document.getElementById("game");
    game.appendChild(table);
    fit(width, height);
}
$(window).resize(function () {
    fit(columns, rows);
});
function fit(width, height) {
    if ((width / height) <= (($(window).width()) / ($(window).height()))) { //If column/rows ratio is smaller or equal to window resoultion ratio
        //We need to care more about height in that case
        let square = document.getElementsByClassName("square");
        let arr = Array.from(square);
        let size = 85 / height;
        for (let index in arr) {
            arr[index].style.width = size + "vh";
            arr[index].style.height = size + "vh";
            arr[index].style.borderWidth = "0.5vh";
        }
        $("#top").css("height", size + "vh");
        $("#face").css("height", size + "vh");
        $("#face").css("width", size + "vh");
    }
    else {
        //We need to care more about width in that case
        let square = document.getElementsByClassName("square");
        let arr = Array.from(square);
        let size = 85 / width;
        for (let index in arr) {
            arr[index].style.width = size + "vw";
            arr[index].style.height = size + "vw";
            arr[index].style.borderWidth = "0.5vw";
        }
        $("#top").css("height", size + "vw");
        $("#face").css("height", size + "vw");
        $("#face").css("width", size + "vw");
    }
}
$(window).contextmenu(function (e) {
    e.preventDefault();
});
createBoard(columns, rows);
