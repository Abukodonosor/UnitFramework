"use strict"

import express from "express";
import cookieParser from 'cookie-parser';
import logger from 'morgan';

export function ExpressFactoryCreateNew() {
        return new Express();
}

class Express {

    //init library's to support the express server
    constructor() {
        this.app = express();
        this.app.use(logger('dev')); //colored text
        this.app.use(express.json()); 
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
    }

    /** 
     * Set domain layers:
     * -this section is about setting the domain,
     *  where we will implement logic for specific domain
     */
    setDomain( domains ) {
        for(let domain of domains ) {
            this.app.use( "/" + domain.type, domain.definition );
        }
    }
    
    // start the application
    start() {
        const port = 3000;
        this.app.listen(port, () =>
            console.log(`Example app listening on port ${port}!`)
        )
    }

}

