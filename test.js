'use strict';


// // console.log("DJOKA")

const express = require('express');
const app = express();
const events = require('events');
const port = 9987
var i = 0;

app.get('/', (req,res) => {
    i++;
    console.log("Jebote: "+i);
    for(let j = 0;j<10*1000000*1000; j++){
            j++;
    }
    res.send("djoka");
});

app.get('/1', (req,res) => {
    i++;
    process.nextTick(()=>{console.log("OdmaSledeci: " + i)});
    res.send("KUrcobic "+ i);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// function djoka(text,time , callback=null){
//     setTimeout(()=>{
//             console.log(text)

//             if( callback != null)
//                 callback();
//         }, time)
// }

// djoka("ajde1", 3000);
// djoka("djoka3",1000, function(){  process.nextTick(()=>{console.log("DJOKA")}); })
// djoka("djoka2",0)