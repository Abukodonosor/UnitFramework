/**
 * TO DO:
 * - implement promise sql query, to replace callback calls
 */

 export function queryPromise(query, queryParams ){
     return new Promise( (resolve, reject ) => {
        if( query === null){
            throw new Error("wrong parameter value of queryPromise() function!")
        }
        this.query(query, queryParams, function (error, results, fields) {
            if (error) throw error;
            resolve(results[0].solution);
        });
     });
 } 