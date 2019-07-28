"use strict"

import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { unitRouteWrapper } from "./expressRouter.js"

export function ExpressFactoryCreateNew( numberOfInstances = null) {
    if ( numberOfInstances == null)
        return new Express();
    else
        return createInstances( numberOfInstances, Express);
}

class Express {

    static domainInterfaceDefinition = [];
    //init library's to support the express server
    constructor() {
        this.app = express();
        this.app.use(logger('dev')); //colored text
        this.app.use(express.json()); 
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
    }

    /** 
     * Set domain layers:
     * -this section is about setting the domain,
     *  where we will implement logic for specific domain
     */
    setDomain( domains ) {
        for(let domain of domains ) {
            Express.domainInterfaceDefinition.push(domain.type);
        }
    }
    
    // start the application
    start() {
        const port = 3000;
        this.app.listen(port, () =>
            console.log(`Example app listening on port ${port}!`)
        )
    }

    setDomainInterface( domainName, middleware, domainInterfaceSchema ) {
        let domain = Express.domainInterfaceDefinition[0];
        const iterfaceData = {
            app : this.app,
            domain: domain 
        } 
        domainInterfaceSchema(unitRouteWrapper.bind( iterfaceData ))
    }
    


}

/** private helper functions */
//TO DO: every instance to have different portso they can communicate => need to be implemented
function createInstances( numberOfInstances, classBlueprint) {
    let instanceArray = [];
    while( numberOfInstances ){
        instanceArray.push( new classBlueprint)
        --numberOfInstances;
    }
    return instanceArray;
}