const request = require('request');

// // const i = 0;
// function loop (i){
//     if( i == 1000000)
//         return;
//     if(i == 66 || i == 29345 ){
//         request.get('http://localhost:9987', (err,response,body)=>{
//             console.log(body);
//             loop(++i)
//         });
//     }
//     else {
//         request.get('http://localhost:9987/1', (err,response,body)=>{
//             console.log(body);
//             loop(++i)
//         });
//     }
// };

// loop(0);


// var j = 0;
// while( j < 9* 1000 * 100){
//     console.log("aaa")
//     if( j== 44* 100){
//     });
//     } else {
//         request.get('http://localhost:9987', (err,response,body)=>{
//             console.log(body);
//         });
//     }
//     j++;
// }


request.post({url:'http://localhost:3000/airplane/by/card', form: {userId:32}}, function(err,httpResponse,body){ 
    console.log(body);
})

