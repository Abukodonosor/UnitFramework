/**
 * TO DO:
 * - implement promise sql query, to replace callback calls
 */

 export function queryPromise(query, queryParams ){
    let result = [];
     return new Promise( (resolve, reject ) => {
        if( query === null){
            throw new Error("wrong parameter value of queryPromise() function!")
        }
        this.query(query, queryParams, function (error, results, fields) {
            if (error) throw error;
            for(let row of results) {
                result.push(row);
            }
            resolve(result);
        });
     });
 } 