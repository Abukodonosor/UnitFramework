'use strict';
/**
 * 
 * Mysql connection driver
 *  - This wrapper give you choice to choose connection pattern.
 *    Also you will be protected of creating multiple connections, and also will give you
 *    stability to use mysql connection handler in your application
 * 
 */
var mysql = require('mysql');

var dbConnection;
var poolDbConnection;

// export function MySql ( config ){
    
    // Singleton pattern used for db connection 
export function getSingletonConnection() {
        if (dbConnection) return dbConnection;
        dbConnection =  mysql.createConnection({
            host     : 'localhost',
            user     : "root",
            password : "qweqwe123",
            database : "boat_tracker"
        });	
        dbConnection.connect();
        return dbConnection;
    }

    // Pool pattern used for db connections
export function getPoolConnection() {
        if (poolDbConnection) return poolDbConnection;
        poolDbConnection = mysql.createPool({
            connectionLimit : 10,
            host            : 'localhost',
            user            : "",
            password        : "",
            database        : ""
        });
        return poolDbConnection;
    }


/**
 * 
 *  Usage of db connections EXAMPLE:
 *  
 * 
    const driver = require('./mysqlTest.js');
    var mysqlConnection = driver.singletonConnection; 

    mysqlConnection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
    });
 * 
 * 
 */