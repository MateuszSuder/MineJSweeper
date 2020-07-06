function ranInt(begin: number, end:number, howMany:number, repeatNumbers?: boolean){ //Function generating random integers, last arguemnt is optional (false). Ending number included
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
                let result: number;
                result = Math.floor(Math.random() * (end - begin + 1)) + begin;
                return result;
            }else{
                let result: number[] = [];
                if(repeatNumbers){
                    for(let k = 0; k < howMany; k++){
                        result[k] = Math.floor(Math.random() * (end - begin + 1)) + begin;
                    }
                    return result;
                }else{
                    if(howMany > ((end-begin)+1))
                        throw "Can't return " + howMany + " ints. Range is " + begin + " to " + end;
                    let allPossibilities: number[] = [];
                    for(let m = 0; m <= (end-begin); m++){
                        allPossibilities[m] = begin + m;
                    }
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