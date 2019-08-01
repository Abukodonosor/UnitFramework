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


const data = {
    userId:32,
    places: [1,2,3],
    priceRange: "djoka je bre",
    filterSchema: { kljuc: "ajde", bre:2}
};

/// TO DO CONTINUE: make request by json stringify
request.post({url:'http://localhost:3000/airplane/by/card', form:{ data: JSON.stringify(data)} }, function(err,httpResponse,body){ 
    console.log(body);
})
