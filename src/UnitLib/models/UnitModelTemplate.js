"use strict"

import { getSingletonConnection } from '../lib/lib.js'

export class UnitModelTemplate {

    static dbConnection = getSingletonConnection(); //TO DO: implement config parameter for this

}