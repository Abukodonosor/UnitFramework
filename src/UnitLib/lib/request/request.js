"use strict"

import request from 'request';

export class Request {
    
    /* request wrap */
    static async post( url, data, headers) {
        return await RequestLibWrape().sendRequest( "POST", url, data, headers);
    }

    static async get( url, data, headers) {
        return await RequestLibWrape().sendRequest( "GET", url, data, headers);
    }

}

/** 
 * Private Request library wrap.
 * For now, he support methods: get | post | put | delete
 * 
 */
function RequestLibWrape() {
    //error & success handling messages
    const
        error_msg = `Request fail to ${url}, log:`,
        success_msg = `Request successful to ${url}, body`;

    async function sendRequest(method, url, data, headers) {
        request({
            method: method,
            url: url ,
            headers: headers,
            formData: data
        }, (err, httpResponse, body) => {
            if (err) {
                console.error(error_msg, err);
                return reject(err)
            }
            // console.log(success_msg, body);
            return resolve(body, httpResponse);
        });
    }   

    return {
        send: sendRequest
    }
}

