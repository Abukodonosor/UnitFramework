'use strict';
/**
 * 
 * Mysql connection driver
 *  - This wrapper give you choice to choose connection pattern.
 *    Also you will be protected of creating multiple connections, and also will give you
 *    stability to use mysql connection handler in your application
 * 
 */
import {
    getSingletonConnection,
    getPoolConnection
} from './mysqlConnections';

const drivers = ['mysql', 'postgre', 'mongo'];
const connTypes = [ 'singleton', 'pool' ];

 export function DbDriver( driverType, connectionType ){

    switch( driverType ){
        case 'mysql':
            return connectionTypeInstanceByDriver(connectionType, driverType)
        case 'postgre':
            break;

        case 'mongo':
            break;

        default:
            throw new Error("Connection driver is invalid !!!");
    }
 }

 function connectionTypeInstanceByDriver( connType , driverName){
    if( connTypes.indexOf(connType) === -1 ){
        throw new Error("invalid connection pattern!")
    }
    switch(driverName){
        case 'mysql':
            if( connType === connTypes[0]){
                return getSingletonConnection();
            } 
            else if ( connType === connTypes[1]) {
                return getPoolConnection();
            }
        
    }
 }