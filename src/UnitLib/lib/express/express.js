"use strict"

import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import path from "path";

import { unitRouteWrapper, unitRouteWrapperGet } from "./expressRouter.js"

export function ExpressFactoryCreateNew(config, numberOfInstances = null) {
    if ( numberOfInstances == null)
        return new Express(config);
    else
        return createInstances( numberOfInstances, Express);
}

class Express {

    static expressAppConfig = new Object();
    static domainInterfaceDefinition = [];
    //init library's to support the express server
    constructor( config ) {
        Express.expressAppConfig = config;
        this.app = express();
        this.app.use(logger('dev')); //colored text
        this.app.use(express.json()); 
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        //appType is webApp bonus config like view engine, viewPath and static public folder expose
        if (Express.expressAppConfig['defaultConfig.service_info.appType'] === "webApp") {
            this.app.set('view engine', 'ejs');
            this.app.set('views', path.join(
                __dirname + 
                Express.expressAppConfig['defaultConfig.service_info.viewPath'] , "views"));//TO DO -> Implement config support for view and public engine
            this.app.use(express.static(path.join(
                __dirname +
                Express.expressAppConfig['defaultConfig.service_info.publicPath'] , 'public')));
        }
    }

    /** 
     * Set domain layers:
     * -this section is about setting the domain,
     *  where we will implement logic for specific domain
     */
    setDomain( domains ) {
        for(let domain of domains ) {
            Express.domainInterfaceDefinition.push(domain);
        }
    }

    // start the application
    start() {
        const port = Express.expressAppConfig['defaultConfig.service_info.port'];
        this.app.listen(port, () =>
            console.log(`Example app listening on port ${port}!`)
        )
    }

    //Implement and bind domain interface to unitRouter
    setDomainInterface( domainName, middleware, domainInterfaceSchema ) {
        let domain = findExectDomainName(domainName)
        const interfaceData = {
            app : this.app,
            domain: domain.type
        } 
        domainInterfaceSchema(
            unitRouteWrapper.bind( interfaceData ),
            unitRouteWrapperGet.bind( interfaceData )
        )
    }

    // this function change default config for unitFramework
    setConfig( newConfig, defaultConfig, UnitConfig ){
        UnitConfig = configServiceInstance.setConfig(newConfig, defaultConfig);
        Express.expressAppConfig = UnitConfig;
        return UnitConfig;
    }

}

/** private helper functions */
//TO DO: every instance to have different ports they can communicate => need to be implemented
function createInstances( numberOfInstances, classBlueprint) {
    let instanceArray = [];
    while( numberOfInstances ){
        instanceArray.push( new classBlueprint)
        --numberOfInstances;
    }
    return instanceArray;
}

function findExectDomainName(domainName){
    return  Express
                .domainInterfaceDefinition
                .filter(el => {
                    if ( el.definition == domainName )
                        return el;
                })[0];
}