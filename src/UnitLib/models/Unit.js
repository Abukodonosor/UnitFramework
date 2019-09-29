"use strict";

import { UnitModelTemplate } from './UnitModelTemplate.js'
import { config as defaultConig }  from '../DefaultConfig.js';
import { ConfigService } from "../services/ConfigService.js"

const configServiceInstance = ConfigService();

import { 
    ExpressFactoryCreateNew, 
    DbDriver
} from '../lib/lib.js';

export default class Unit {

    static dbConn = DbDriver('mysql', 'singleton'); // from config parameter to choose singleton or pool pattern
    static cacheConn; //static cache connection (if we have redis)
    static registryConn;
    static classTemplate = UnitModelTemplate; //support to make class Models
    static config = new Object();

    constructor(config) {
        Unit.config = configServiceInstance.setConfig(config, defaultConig);
        this.service = ExpressFactoryCreateNew(Unit.config);
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