'use strict';
// import fs from 'fs';
import { spawn } from 'child_process';
import  cluster  from 'cluster';
import  os  from 'os'; 
import path from 'path';
import express from 'express'

/*** test unit network lib */
import UnitLib from './UnitLib/UnitLib.js';

const unitService1 = UnitLib.newService();

unitService1
    .service
    .setDomain([
    {
        type: 'set1',
        definition: nekaFunckija()
    },
    {
        type: 'set2',
        definition: nekaFunckija()
    }]);

unitService1.Run();


//Funckija koja obradjuje rute 
function nekaFunckija(){
    const router = express.Router();
    router.get('/qwe', async (req, res, next) => {

        UnitLib.dbConnection.query("select 1+1",[], (err,result)=>{
            console.log(result)
            res.send("qwe bre");
        })

    });
    router.post('/qwe123', async (req, res, next) => {

        res.send("qwe qwe");
    });
    return router;
}


//Example how to make class from this package
class User extends UnitLib.classTemplate {

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









