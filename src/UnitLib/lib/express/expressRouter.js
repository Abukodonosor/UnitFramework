"use strict"

import { validateServiceEndpoint } from '../lib.js';

export function unitRouteWrapper(url, validationSchema, abstractControllerAction ) {
    // validationSchema can be middleware on to be last middleware (in function 1st step )
    const UrlModulePath = fullUrlRouteFormat(this.domain, url);
    this.app.post(UrlModulePath, ( request, response ) => {
        const { 
            status, outputData
        } = validateServiceEndpoint( validationSchema, request );

        routeValidationProtector( status, response, request, outputData, abstractControllerAction );
    })
}

export function unitRouteWrapperGet(url, validationSchema, abstractControllerAction ) {
    // validationSchema can be middleware on to be last middleware (in function 1st step )
    const UrlModulePath = fullUrlRouteFormat(this.domain, url);
    this.app.get(UrlModulePath, ( request, response ) => {
        const { 
            status, outputData
        } = validateServiceEndpoint( validationSchema, request );

        routeValidationProtector( status, response, request, outputData, abstractControllerAction );
    })
}

function fullUrlRouteFormat( domain, url ) {
    return "/" + domain + url
}

function routeValidationProtector( status, response, request, outputData, abstractControllerAction ){
    if ( status == false )
        response.send("Invalid parameters!")
    else{
        if( outputData === undefined ) {
            abstractControllerAction( request, response ); //TO-DO: implement 
        }else {
            abstractControllerAction( request, response, ...outputData.arguments );
        }
    }
}