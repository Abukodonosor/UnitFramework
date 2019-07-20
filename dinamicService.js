"use strict";

var json = `{
    "db_service": {
        "name": "GrindingService",
        "version": "1.0.0",
        "lockfileVersion": 1
    }
}`;

var text = JSON.parse(json);

function API(){

    function makeFunction(){
        var obj = Object.create(null);
        
        let keys = text["db_service"];
        console.log(keys)
        obj["DbService"] = function (...keys){
            console.log(keys);
        }

        return obj;
    }

    return {
        // methodName: method,
        makeFunction: makeFunction,
    }
}


var x = API().makeFunction();

x.DbService("zero");

console.log(text);

