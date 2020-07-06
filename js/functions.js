"use strict";
function ran(begin, end, howMany, repeatNumbers, onlyInts) {
    if (!Number.isInteger(begin) || !Number.isInteger(end) || !Number.isInteger(howMany)) {
        throw "Provided values are not integers";
    }
    else {
        if (repeatNumbers == undefined)
            repeatNumbers = false;
        if (onlyInts == undefined)
            onlyInts = true;
    }
}
