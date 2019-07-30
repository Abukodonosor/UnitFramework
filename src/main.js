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
        // places: 'Array',
        // priceRange: 'String',
        // filterSchema: 'Object'
    }, RentActionController );
    
    AirplaneRouter('/by/airplane',{
        userId: 'Number',
        places: 'Array',
        priceRange: 'String',
        filterSchema: 'Object'
    }, RentActionController );
    
    AirplaneRouter('/schedule/fly',{
        userId: 'number',
        places: 'array',
    }, RentActionController );

});

unitService1.Run();

function RentActionController( request, response, userId, places, priceRange, filterSchema) {
    
    console.log("RADI FUNKCIJA")
    // let expiredTickets = Tickets.getAllExpiredTickets();
    // let expiredTickets = UnitNetwork.getAllExpiredTickets(userId); // : TO IMPLEMENT - how to fetch data from other services
    // let newTicket = Ticket.createNewTicket(expiredTickets);
    // newTicket.addBonus('random');
    const newTicket = "success";
    response.send(newTicket);
}


//Example how to inherit class from this package
class Ticket extends UnitLib.classTemplate {

    constructor(){
        super();
        this.djoka = 3;
    }
}

// debugger
// console.log(unitService1);



























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









