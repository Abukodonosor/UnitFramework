'use strict';

const express = require('express');
const app = express();
const events = require('events');
const port = 9987
var i = 0;

app.get('/', (req,res) => {
    i++;
    console.log("Iter: "+i);
    for(let j = 0;j<10*1000000*1000; j++){
            j++;
    }
    res.send("response");
});

app.get('/1', (req,res) => {
    i++;
    process.nextTick(()=>{console.log("NextIter: " + i)});
    res.send("Omggg "+ i);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))