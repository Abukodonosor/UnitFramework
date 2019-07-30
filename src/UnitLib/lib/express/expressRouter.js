"use strict"

import { validateServiceEndpoint } from '../lib.js';

export function unitRouteWrapper(url, validationSchema, abstractControllerAction ) {
    // validationSchema can be middleware on to be last middleware (in function 1st step )
    const UrlModulePath = fullUrlRouteFormat(this.domain, url);
    this.app.post(UrlModulePath, ( request, response ) => {
        const { 
            status, data
        } = validateServiceEndpoint( validationSchema, request );

        routeValidationProtector( status, response, request, data, abstractControllerAction );
    })
}

function fullUrlRouteFormat( domain, url ) {
    return "/" + domain + url
}

function routeValidationProtector( status, response, request, data, abstractControllerAction ){
    if ( status == false )
        response.send("Invalid parameters!")
    else
        abstractControllerAction( request, response, {...data} );
}