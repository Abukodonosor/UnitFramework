'use strict';
/**
 * 
 * Db driver class
 *  - This wrapper give you choice to choose connection pattern.
 *    Also you will be protected of creating multiple connections, dbSets and also will give you
 *    stability to use (mysql/postgre/mongo) connection handler in your application
 * 
 */

// MySql connection patterns
import {
    getSingletonConnection,
    getPoolConnection
} from './mysqlConnections';

// Import query wrapper for mysqlPromiseFunctions
import {
    queryPromise
} from './queryUnit';

// Utils object manipulation
import {
    injectProperty
} from '../util/objectManipulation'

const drivers = ['mysql', 'postgre', 'mongo'];
const connTypes = [ 'singleton', 'pool' ];

 export function DbDriver( driverType, connectionType, unitConfig ){
    switch( driverType ){
        case 'mysql':
            return injectPropertyQueryPromise( 
                connectionTypeInstanceByDriver(connectionType, driverType, unitConfig),
                queryPromise);
        case 'postgre':
            break;

        case 'mongo':
            break;

        default:
            throw new Error("Connection driver is invalid !!!");
    }
 }

 function injectPropertyQueryPromise( parentObject, injector ) {
     return injectProperty( parentObject, injector, "queryPromise");
 }

 function connectionTypeInstanceByDriver( connType , driverName, unitConfig){
    if( connTypes.indexOf(connType) === -1 ){
        throw new Error("invalid connection pattern!")
    }
    switch(driverName){
        case 'mysql':
            if( connType === connTypes[0]){
                return getSingletonConnection(unitConfig);
            } 
            else if ( connType === connTypes[1]) {
                return getPoolConnection();
            }
    }
 }