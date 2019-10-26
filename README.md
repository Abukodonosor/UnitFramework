# UnitFramework
microservice framework guided by DDD


This is microservice framework.

To test his functionality take next steps:
1.npm install <br>
2.yarn dev ( to run server ) <br>
3. node node client-test.js ( script to test end-point ) <br>


## If you wish to use and test this framework, next snippet will give you introduction on how to use framework.
```
var UnitLib = require('@abukodonosor/unit');
const config = {
    // service information
    service_info: {
        name: "Unit",
        communication_type: "http", // "http" || "ipc" 
        appType: "webApp", // "microservice" || "webApp" => TO DO - implement support for making webApp or microserviceApp
        port: 3000,
        viewPath: "/../../../test_webapp",
        publicPath: "/../../../test_webapp"
    },
    //mysql db config
    db: {
        ip: "local", // "local" || "public"
        port: 3000, // configService.availablePort() || 3000  : NOT IMPLEMENTED
        db_name: "db_name",
        db_user: "unit",
        db_password: "unit",
    },
    //unit registry discovery connection config : NOT IMPLEMENTED
    registry: {
        registry_ip: "192.168.2.1",
        registry_port: 9000,
        registry_token: "hw$xxg93`_sXXX09!2_pPq"
    },
    //redis cache mechanism config : NOT IMPLEMENTED
    redis_cache: {
        cache_ip: "local",
        cache_port: 6770,
    },
};

const unitService1 = UnitLib.default.newService(config);

unitService1
    .setDomains([
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
], function( AirplaneRouter, AirplaneRouterGet ) {

    AirplaneRouter('/by/card',{
        userId: 'number',
        places: 'array',
        priceRange: 'string',
        filterSchema: 'object'
    }, RentActionController );
});

unitService1.Run();

async function ViewRentActionController( request, response) {
    console.log("RADI-ajdee")
    response.render('index', { title: 'New WebApp' });
}

async function RentActionController( request, response, userId, places, priceRange, filterSchema) {

    console.log("Controller action");
    let expiredTickets = await Ticket.getAllExpiredTickets();
    console.log("Get all expired tickets: " + expiredTickets);
    let nonExpiredTickets = await Ticket.getNonExpiredTickets();
    console.log("All Non-Expired tickets: " + nonExpiredTickets);
    const newTicket = "success";
    response.send(newTicket);

}

//Example how to inherit class from this package
class Ticket extends UnitLib.default.classTemplate {

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
    static getNonExpiredTickets() {
        return this.dbConnection.queryPromise("SELECT 1 + 1 AS solution",[]);
    }
    // result array
    static testNewDBquery() {
        return this.dbConnection.queryPromise("select * from boat_tracker.boat",[]);
    }
}

```
