'use strict';
/*** test unit network lib */
import { UnitLib } from '../UnitLib/UnitLib.js';
import { config } from './config.js';

const UnitLibFactory = UnitLib(config);
// const UnitNetwork = UnitLib.unitNetwork; // this is dynamic discovery of patterns( microservices, and other peers in network)
const unitService1 = UnitLibFactory.newService;

// define domain of your service aka application
unitService1
    .setDomains([
    {
        type: '*',
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

    //Get Method to serve static files from server
    AirplaneRouterGet('',{
    }, ViewRentActionController);

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

async function ViewRentActionController( request, response) {
    console.log("RADI-ajdee")
    response.render('index', { title: 'New WebApp' });
}

async function RentActionController( request, response, userId, places, priceRange, filterSchema) {

    console.log("Controller action+");
    let expiredTickets = await Ticket.testNewDBquery();
    console.log("Get all expired tickets: " + expiredTickets.length);
    // let expiredTickets = UnitNetwork.getAllExpiredTickets(userId); // : TO IMPLEMENT - fetch data from other services
    let nonExpiredTickets = await Ticket.getNonExpiredTickets();
    console.log(nonExpiredTickets);
    const newTicket = "success";
    response.send({odgovor:newTicket});

}

//Example how to inherit class from this package
class Ticket extends UnitLibFactory.classTemplate {

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
        return this.dbConnection.queryPromise("INSERT INTO talk.user (username,email,pass) VALUES (?,?,?)",["username", "email", "password"]);
    }
    // result array
    static testNewDBquery() {
        return this.dbConnection.queryPromise("select * from talk.user",[]);
    }
}
