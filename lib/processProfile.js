/**
 * Created by northka.chen on 2016/11/9.
 */
const localUtil      = require('./util/index')
const interfaceCache = require('./interfaceCache')
const engines        = require('./engines')
const Interface      = require('./Interface')
const initialState   = {
    status      : 'production',
    urls        : {
        production : 'localhost'
    },
    port        : 80,
    engine      : 'http',
    timeout     : 3000,
    httpDefault : {

        method     : 'GET',
        withCookie : false,
        cookie     : '',
        path       : '/'
    }
}

function initInterfaces(profile) {
    Object.assign(initialState, profile)
    if(profile.interfaces){
        Array.isArray(profile.interfaces) && profile.interfaces.forEach(processInterface)
    }
}

function processInterface( interfaceConfig ) {
    if(!interfaceConfig.id){
        throw new Error('interfaces need id')
    }
    let interfaceParams = {
        id      : interfaceConfig.id,
        status  : interfaceConfig.status || initialState.status,
        engine  : interfaceConfig.engine || initialState.engine,
        port    : interfaceConfig.port || initialState.port,
        timeout : interfaceConfig.timeout || initialState.timeout
    }
    interfaceParams.host = localUtil.configureHost(interfaceConfig, initialState, interfaceParams.status)
    interfaceParams[interfaceParams.engine] = Object.assign({}, initialState[interfaceParams.engine+'Default'], interfaceConfig[interfaceParams.engine])

    interfaceCache.pushInterface(new Interface(interfaceParams, engines.getEngine(interfaceParams.engine)))
}

module.exports = initInterfaces