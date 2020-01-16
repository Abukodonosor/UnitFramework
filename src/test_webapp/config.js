"use strict"

export const config = {
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
        ip: "localhost", // "local" || "public"
        port: 3306, // configService.availablePort() || 3000  : NOT IMPLEMENTED
        db_name: "catch_talk",
        db_user: "root",
        db_password: "qweqwe123",
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