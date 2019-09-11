'use strict';
// import fs from 'fs';
import { spawn } from 'child_process';
import  cluster  from 'cluster';
import  os  from 'os'; 
import path from 'path';
import express from 'express'

/*** test unit network lib */
import UnitLib  from './UnitLib/UnitLib.js';

const UnitNetwork = UnitLib.unitNetwork;
const unitService1 = UnitLib.newService();

// define domen of your service aka application
unitService1
    .service
    .setDomain([
    {
        type: 'airplane',
        definition: "Airplane"
    },
    {
        type: 'boat',
        definition: "Boat"
    }]);
    
unitService1.implementDomain("Airplane",//setDomainModules
[
    'authMiddleware', 
    'serviceAvailabilityMiddleware'
], function( AirplaneRouter ) {
    
    AirplaneRouter('/by/card',{
        userId: 'number',
        places: 'array',
        priceRange: 'string',
        filterSchema: 'object'
    }, RentActionController );
    
    AirplaneRouter('/by/airplane',{
        userId: 'number',
        places: 'array',
        priceRange: 'string',
        filterSchema: 'object'
    }, RentActionController );
    
    AirplaneRouter('/schedule/fly',{
        userId: 'number',
        places: 'array',
    }, RentActionController );

});

unitService1.Run();

async function RentActionController( request, response, userId, places, priceRange, filterSchema) {

    console.log("Controller action")
    console.log(userId)
    console.log(priceRange);
    let expiredTickets = await Ticket.getAllExpiredTickets();
    console.log("Get all expired tickets: " + expiredTickets);
    // let expiredTickets = UnitNetwork.getAllExpiredTickets(userId); // : TO IMPLEMENT - fetch data from other services
    let nonExpiredTickets = await Ticket.getNonExpiredTickets();
    console.log("All Non-Expired tickets: " + nonExpiredTickets);
    const newTicket = "success";
    response.send(newTicket);

}


//Example how to inherit class from this package
class Ticket extends UnitLib.classTemplate {

    constructor(){
        super();
        this.name = 3;
    }

    static getAllExpiredTickets(){
        return new Promise((resolve,reject)=>{
            this.dbConnection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
                if (error) throw error;
                console.log('The solution is: ', results[0].solution);
                resolve(results[0].solution)
            });
        })
    }
    // promise wrapper around query lib
    static getNonExpiredTickets(){
        return this.dbConnection.queryPromise("SELECT 1 + 1 AS solution",[]);
    }
}

// debugger
// console.log(unitService1);

























// // Some testing code
// const { fork } = require('child_process');

// const forked = fork('demo.js');

// console.log(process.pid)

// forked.on('message', (msg) => {
//   console.log('Message from child', msg);
// });

// forked.send({ hello: 'world' });

// const child = spawn('pwd');

// child.on('exit', function (code, signal) {
//     console.log('child process exited with ' +
//                 `code ${code} and signal ${signal}`);
//   });

/*  Here is part of clustered code .. with same code as master process have */

// const numCPUs = os.cpus().length;

// const clusterMap = {};

// if (cluster.isMaster) {
//     console.log('Master process is running with pid:', process.pid);
//     for (let i = 0; i < numCPUs; ++i) {
//         const worker = cluster.fork({ workerId: "worker" +  i });
//     }
// } else {
//     console.log('Worker started with pid:', process.pid);
//     console.log("workerID: " + process.env.workerId);
// }









