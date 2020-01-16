"use strict";

import { UnitModelTemplate } from './UnitModelTemplate.js'
import { config as defaultConig }  from '../DefaultConfig.js';
import { ConfigService } from "../services/ConfigService.js"

const configServiceInstance = ConfigService();

import { 
    ExpressFactoryCreateNew, 
    DbDriver
} from '../lib/lib.js';

export class Unit {

    static cacheConn; //static cache connection (if we have redis)
    static registryConn;
    static dbConn = new Object();
    static config = new Object();

    constructor(config) {
        // console.log(config);
        Unit.config = configServiceInstance.setConfig(config, defaultConig);
        this.service = ExpressFactoryCreateNew(Unit.config);
        Unit.dbConn = DbDriver('mysql', 'singleton', Unit.config);
    }

    Run() {
       this.service.start()    
    }

    setDomains( domains ) {
        this.service.setDomain(domains);
    }

    implementDomain( domainName, middleware, domainInterfaceSchema ) {
        //Implement middleware support
        this.service.setDomainInterface( domainName, middleware, domainInterfaceSchema);
    }

}   

export function classTemplateInit(config){
    const mainConfig = configServiceInstance.setConfig(config, defaultConig);
    const newClass = UnitModelTemplate
    newClass.dbConnection = DbDriver('mysql', 'singleton', mainConfig);

    return newClass
}