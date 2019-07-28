"use strict"

export default config = {

    // service information
    service_info: {
        name: "Unit",
        communication_type: "http", // "http" || "ipc" 
    },

    //mysql db config
    db: {
        ip: configService.getIp("local"), // "local" || "public"
        port: configService.availablePort() || 3000, // configService.availablePort() || 3000  : NOT IMPLEMENTED
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
        cache_ip: configService.getIp("local"),
        cache_port: 6770,
    },


};