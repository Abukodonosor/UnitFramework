"use strict";

const validationOptions = [ "number", "object", "array", "string", "boolean" ]

export function validateServiceEndpoint( validationSchema, request ){

    let requestInput = JSON.parse(request.body.data);
    let status = true;
    const data = Object.assign( {}, requestInput);
    let outputData = new Object();
    outputData.arguments = new Array();

    const arrayOfKeys = Object.keys(validationSchema);
    
    for(let key in validationSchema ) {
        let belongToSchema = data.hasOwnProperty(key);
        
        // check type
        let dataType = typeof data[key];
        if ( validationOptions.indexOf( dataType ) == -1 ) {
            status = false;
            break;
        } 

        // security check
        if ( belongToSchema ) {
            arrayOfKeys.splice(
                arrayOfKeys.indexOf('key'), 1 )
            outputData.arguments.push(data[key]);
        }
    }
    console.log(data)

    return {
        status,
        outputData
    }
}