'use strict';

//load all lib packages
// import 

/**
 * This service need to contain connections for: mysql, postgreSql
 */


const supportedConnections =  [ 'mysql' ];  //[ 'mysql', 'mongo', 'postgre']


export function useDriver( driverName , connectionPattern ) {
    DbService.dbDriver = driverName
    
    //check if driver exist [ mysql, postgre, mongo]

    //if driver exist, instance his connection

    //wrap his connection with query promise property


    //return

}    




