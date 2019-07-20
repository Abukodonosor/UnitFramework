
"use strict"

import Unit  from "./models/Unit.js";


export default (function UnitLib() {

    //new instance of Unit object 
    function newUnit() {
        return new Unit();
    }

    //export db connection handler
    function dbConnectionHandler() {
        return Unit.dbConn;
    }

    function classTemplate() {
        return Unit.UnitModel
    }

    return {
        // setConfig: Unit.setConfig(),
        newService: newUnit,
        dbConnection: dbConnectionHandler(),
        classTemplate: classTemplate()
    }
}())