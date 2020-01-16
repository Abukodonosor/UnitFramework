
"use strict"

import { Unit, classTemplateInit }  from "./models/Unit.js";


export function UnitLib(config) {

    const unitConfig = config;
    //new instance of Unit object 
    function newUnit() {
        return new Unit( unitConfig );
    }

    //export db connection handler => not finished
    function dbConnectionHandler() {
        return Unit.dbConn;
    }

    //class template
    function classTemplate() {
        return classTemplateInit(unitConfig)
    }

    return {
        // setConfig: Unit.setConfig(),
        newService: newUnit(),
        dbConnection: dbConnectionHandler,
        classTemplate: classTemplate()
    }
};