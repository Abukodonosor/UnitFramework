/**
 * TO DO:
 * - implement promise sql query, to replace callback calls
 */

export function queryPromise(query, queryParams ){
    return new Promise((resolve, reject ) => {
        if( query === null){
            throw new Error("wrong parameter value of queryPromise() function!")
        }
        this.query(query, queryParams, function (error, results) {
            if (error) throw error;
            
            //edge case when we use UPDATE/INSERT/DELETE
            if(results.insertId){
                return resolve({ insertId: results.insertId})
            }else{
                let res = [];
                for(let row of results) {
                    res.push(row);
                }
                return resolve(res);
            }
        });
    });
} 