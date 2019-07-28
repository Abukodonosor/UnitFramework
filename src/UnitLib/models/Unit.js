"use strict";

import { UnitModelTemplate } from './UnitModelTemplate.js'
import { 
    ExpressFactoryCreateNew, 
    getSingletonConnection
} from '../lib/lib.js';

export default class Unit {

    static dbConn = getSingletonConnection() // from config parameter to choose singleton or pool pattern
    static cacheConn; //static chache connection (if we have redis)
    static registryConn;
    static classTemplate = UnitModelTemplate; //support to make class Models
    
    constructor() {
        this.service = ExpressFactoryCreateNew(); // depend on config
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