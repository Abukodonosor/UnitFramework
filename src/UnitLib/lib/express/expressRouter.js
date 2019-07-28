"use strict"

export function unitRouteWrapper(url, validationSchema, abstractControllerAction ) {
    // validationSchema can be middleware on to be last middleware (in function 1st step )
    const UrlModulePath = fullDomainFormat(this.domain, url)
    this.app.post(UrlModulePath, ( request, response ) => {
        //if validation pass, contact real controller :IMPLEMENT VALIDATION OF PARAMETERS
        abstractControllerAction( request, response );
    })
}

function fullDomainFormat( domain, url ) {
    return "/" + domain + url
}