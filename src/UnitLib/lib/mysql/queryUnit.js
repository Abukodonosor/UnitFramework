/**
 * TO DO:
 * - implement promise sql query, to replace callback calls
 */

export function queryPromise(query, queryParams ){
    let result = [];
    return new Promise((resolve, reject ) => {
        if( query === null){
            throw new Error("wrong parameter value of queryPromise() function!")
        }
        this.query(query, queryParams, function (error, results) {
            if (error) throw error;

            if(results.insertId != undefined){
                return resolve({
                    insertId: results.insertId,
                })
            }
            
            for(let row of results) {
                result.push(row);
            }
            resolve(result);
        });
    });
} 