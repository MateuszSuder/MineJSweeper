function ran(begin: number, end:number, howMany:number, repeatNumbers?: boolean, onlyInts?: boolean){ //Function generating random numbers, last two arguemnts are optional (false, true)
    if(!Number.isInteger(begin) || !Number.isInteger(end) || !Number.isInteger(howMany)){
        throw "Provided values are not integers";
    }else{
        if(repeatNumbers == undefined)
            repeatNumbers = false;
        if(onlyInts == undefined)
            onlyInts = true;
        
    }
}