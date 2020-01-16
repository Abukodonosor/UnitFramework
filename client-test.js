const request = require('request');

const data = {
    userId:32,
    places: [1,2,3],
    priceRange: "something unusaual",
    filterSchema: { newKey: "goOn", secondKey: 2}
};

/// TO DO CONTINUE: make request by json stringify
request.post({url:'http://localhost:3000/airplane/by/card', form:{ data: JSON.stringify(data)} }, function( err, httpResponse, body){ 
    console.log(body);
})
