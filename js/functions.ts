//This file contains useful functions for calculations etc


function ranInt(begin: number, end: number, howMany: number, repeatNumbers?: boolean, except?: number[]):number[]{ //Function generating random integers, last arguemnt is optional (false). Ending number included
    if(!Number.isInteger(begin) || !Number.isInteger(end) || !Number.isInteger(howMany)){
        throw "Provided values are not integers";
    }else{
        if(end<begin)
            throw "End is smaller than begin";
        if(repeatNumbers == undefined)
            repeatNumbers = false;
        if(howMany<1){
            throw "Provided amount is less than 0";
        }else{
            if(howMany == 1){
                let result: number[] = [];
                result[0] = Math.floor(Math.random() * (end - begin + 1)) + begin;
                return result;
            }else{
                let result: number[] = [];
                if(repeatNumbers){
                    for(let k = 0; k < howMany; k++){
                        result[k] = Math.floor(Math.random() * (end - begin + 1)) + begin;
                    }
                    return result;
                }else{
                    if(howMany > (((end-begin)+1)))
                        throw "Can't return " + howMany + " ints. Range is " + begin + " to " + end;
                    let allPossibilities: number[] = [];
                    for(let m = 0; m <= (end-begin); m++){
                        let exception: boolean = false;
                        if(typeof except != undefined){
                            for(let ex = 0; ex < except!.length; ex++){
                                if(except![ex] == (begin+m)){
                                    exception = true;
                                }
                            }
                        }
                        if(exception){
                            continue;
                        } 
                        allPossibilities[m] = begin + m;
                    }
                    allPossibilities = allPossibilities.filter(item => item);
                    for(let p = 0; p < howMany; p++){
                        let temp: number = Math.floor(Math.random()*allPossibilities.length)
                        result[p] = allPossibilities[temp];
                        allPossibilities.splice(temp, 1);
                    }
                    return result;
                }       
            }
        }
    }
}

function placeIntIn2D(input: number, rows: number, columns: number):number[]{ //Places number in two dimensional array
    let output: number[] = [];
    for(let q = 1; q<=rows; q++){
        for(let w = 1; w<=columns; w++){
            if(((q-1)*columns + w) == input)
                return output=[q-1, w-1];
        }
    }
    return output;
}
