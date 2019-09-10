"use strict"

import { getSingletonConnection, DbDriver } from '../lib/lib.js'

export class UnitModelTemplate {

    // static dbConnection = getSingletonConnection(); //TO DO: implement config parameter for this
    static dbConnection = DbDriver('mysql', 'singleton');
}