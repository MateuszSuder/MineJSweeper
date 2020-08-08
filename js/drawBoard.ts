//This file contains html/css related functions, which basicly create the game

let columns: number = 10;
let rows: number = 10;
let bombs: number = 10;
let end: boolean = false;
let time: number = 0;
let numberSquares: number = 0;
let revealedSquares: number = 0;


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
        let bWidth = 8/height;
        for(let index in arr){
            arr[index].style.width = size + "vh";
            arr[index].style.height = size + "vh";
            arr[index].style.borderWidth = bWidth + "vh";
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
        let bWidth = 8/width;
        for(let index in arr){
            arr[index].style.width = size + "vw";
            arr[index].style.height = size + "vw";
            arr[index].style.borderWidth = bWidth + "vw";
        }
        $("#top").css("height", size+"vw");
        $("#face").css("height", size+"vw");
        $("#face").css("width", size+"vw");
        $("#bombs, #time").css("font-size", size+"vw");
    }
}

function onCustom(id: string){
    let rowsNode:JQuery<HTMLElement> = $("#rows");
    let columnsNode:JQuery<HTMLElement> = $("#columns");
    let bombsNode:JQuery<HTMLElement> = $("#bombsNumber");
    if(id == "begginer" || id == "intermediate" || id == "expert"){

        if(!($("#rows, #columns, #bombsNumber").prop("disabled"))){
            $("#rows, #columns, #bombsNumber").prop("disabled", true);
        }

        if(id == "begginer"){
            rowsNode.val(10);
            columnsNode.val(10);
            bombsNode.val(10);
        }else if (id == "intermediate"){
            rowsNode.val(16);
            columnsNode.val(16);
            bombsNode.val(40); 
        }else{
            rowsNode.val(16);
            columnsNode.val(30);
            bombsNode.val(99); 
        }
    }else{
        $(rowsNode).prop("disabled", false);
        $(columnsNode).prop("disabled", false);
        $(bombsNode).prop("disabled", false);
    }
}

function saveDiff(){
    let rowsNode: JQuery<HTMLInputElement> = $("#rows");
    let columnsNode: JQuery<HTMLInputElement> = $("#columns");
    let bombsNode: JQuery<HTMLInputElement> = $("#bombsNumber");

    let rValue: number = parseInt("" + $(rowsNode).val());
    let cValue: number = parseInt("" + $(columnsNode).val());
    let bValue: number = parseInt("" + $(bombsNode).val());

    if(isNaN(rValue)){
        rValue = rows;
    }
    if(isNaN(cValue)){
        cValue = rows;
    }
    if(isNaN(bValue)){
        bValue = rows;
    }

    try{
        checkForErrors(rValue, cValue, bValue);
    }catch(error){
        return $("#error").html(error);
    }

    initalizeBoard(rValue, cValue, bValue);

    toggleOptions();
}

function checkForErrors(rValue: number, cValue: number, bValue: number){
    if(rValue < 8 || rValue > 30){
        throw "Rows must be in 8-30 range";
    }
    if(cValue < 8 || cValue > 30){
        throw "Columns must be in 8-30 range";
    }
    if(bValue < 10 || bValue > 200){
        throw "Bombs must be in 10-200 range";
    }
    if(bValue >= rValue * cValue - 40){
        throw "Too many bombs for that board! Number of bombs must be lesser than columns * rows - 40";
    }
}

function toggleOptions(){
    $("#error").html("");
    $("#options-outer").toggle("slow");
}

$("#options-outer").click(function(e){
    if(e.target.id == "options-outer"){
        toggleOptions();
    }else{
        return;
    }
})

$(window).contextmenu(function(e){
    e.preventDefault();
})
