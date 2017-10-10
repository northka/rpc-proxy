/**
 * Created by northka.chen on 2016/11/10.
 */
const logger = plug('logger');
function configureEngine(Interface = {}, defaultSetting = {}, status) {
    if(Interface[status])
        return configureEngine(Interface[status], defaultSetting, status)
    if(defaultSetting[status])
        return configureEngine(Interface, defaultSetting[status], status)
    return Object.assign({}, defaultSetting, Interface)
}

function configurePool(poolConfig = {}, defaultPool = {}, status) {
    if(poolConfig[status])
        return configurePool(poolConfig[status], defaultPool, status)
    if(defaultPool[status])
        return configurePool(poolConfig, defaultPool[status],status)
    return Object.assign({}, defaultPool, poolConfig)
}
function deepAssign(origin, dest){
    let keyArr = Object.keys(dest)
    for(let i = 0; i < keyArr.length; i++){
        if(typeof dest[keyArr[i]] == 'object' && typeof origin[keyArr[i]] == 'object'){
            deepAssign(origin[keyArr[i]], dest[keyArr[i]])
            continue
        }
        origin[keyArr[i]] = dest[keyArr[i]]
    }
}
module.exports = {
    configureHost : function ( Interface = {} , initialState, status ){
        if(Interface.hosts)
            return Interface.hosts[status]
        if(Interface.host)
            return Interface.host
        if(Interface.urls)
            return Interface.urls[status]
        if(Interface.url)
            return Interface.url
        if(initialState.url)
            return initialState.url
        if(initialState.host)
            return initialState.host
        throw new Error('Interface need set host or url')
    },
    configurePort : function ( Interface ={}, initialState ={}, status){
        if(Interface.ports)
            return Interface.ports[status]
        if(Interface.port)
            return Interface.port
        if(initialState.port)
            return initialState.port

    },
    configureEngine,
    configurePool,
    deepAssign
}