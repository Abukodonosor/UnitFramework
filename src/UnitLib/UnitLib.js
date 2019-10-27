
"use strict"

import Unit  from "./models/Unit.js";


export function UnitLib() {

    //new instance of Unit object 
    function newUnit( config ) {
        return new Unit( config );
    }

    //export db connection handler
    function dbConnectionHandler() {
        return Unit.dbConn;
    }

    //class template
    function classTemplate() {
        return Unit.classTemplate
    }

    return {
        // setConfig: Unit.setConfig(),
        newService: newUnit,
        dbConnection: dbConnectionHandler(),
        classTemplate: classTemplate()
    }
};