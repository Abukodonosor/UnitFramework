/**
 * TO DO:
 * - implement promise sql query, to replace callback calls
 */

 export function queryPromise(query, queryParams ){
     return new Promise( (resolve, reject ) => {
         // replace this ___ with db connection from mysql class
        this.___.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        });
     });
 } 