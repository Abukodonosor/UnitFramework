"use strict"

export function ConfigService() {
    const defaultConfigName = 'defaultConfig';
    const newConfigName = 'newConfig';
    var configInstance = null;

    function extractConfigPropertyFromDefaultConfig( defaultConfig ) {

        let configPropertyKeysMap = Object.keys(defaultConfig);
        const configPropertyKeysMapLength = configPropertyKeysMap.length;
        configPropertyKeysMap = configPropertyKeysMap.map(el=>{
            return defaultConfigName + "." + el;                                    
        });

        let indicator = 0;
        while( configPropertyKeysMap[indicator] !==  undefined ){
            let newPropertyAttribute = configPropertyKeysMap[indicator];
            let childPropertyAttributes = Object.keys(
                eval(newPropertyAttribute)
            );
            //hack to stop execution of object keys on string ( string is object with keys '1','2', etc...)
            if( childPropertyAttributes[0] == '0')
                break;
            let newAttributes = childPropertyAttributes.map(el=>{
                return newPropertyAttribute + "." + el;
            });
            configPropertyKeysMap = configPropertyKeysMap.concat(newAttributes);
            indicator++;
        }
        configPropertyKeysMap = configPropertyKeysMap.slice(configPropertyKeysMapLength, configPropertyKeysMap.length);
        return configPropertyKeysMap;
    }

    function setConfig( newConfig , defaultConfig) {

        const expressBlueprint = {};
        const defaultPropertyKeys = extractConfigPropertyFromDefaultConfig(defaultConfig);
        for(let key of defaultPropertyKeys) {
            let userSchema = key.replace(defaultConfigName, newConfigName); 
            let userConfig = {
                KEY: userSchema,
                VALUE: eval(userSchema)
            };
            
            expressBlueprint[key] = userConfig.VALUE;
            if( userConfig.VALUE === undefined ) {
                expressBlueprint[key] = eval(key);
            }
        }
        return expressBlueprint;
    }

    function newConfig(newConfig , defaultConfig){
        if( configInstance != null)
            return configInstance;

        configInstance = setConfig(newConfig , defaultConfig);
        return configInstance
    }

    return {
        getIp: () => {},
        availablePort: () => {},
        setConfig: newConfig,
    }
}