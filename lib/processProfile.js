/**
 * Created by northka.chen on 2016/11/9.
 */
const path           = require('path')

const localUtil      = require('./util/index')
const interfaceCache = require('./interfaceCache')
const poolCache      = require('./poolCache')
const engines        = require('./engines')
const Interface      = require('./Interface')
const initialState   = {
    status      : 'production',
    host        : '127.0.0.1',
    port        : 80,
    engine      : 'http',
    timeout     : 3000,
    validator   : false,
    mock        : false,
	params      : {}, 
    httpDefault : {
        method     : 'GET',
        withCookie : false,
        cookie     : '',
        path       : '/'
    }
};

function initInterfaces(profile, prePorcess) {
    localUtil.deepAssign(initialState, profile)
    if(profile.pools){
        if(Array.isArray(profile.pools)){
            for(let i = 0; i < profile.pools.length; i++){
                processPool(profile.pools[i])
            }
        }
    }
    if(profile.interfaces){
        if(Array.isArray(profile.interfaces)){
            for(let i = 0 ;i < profile.interfaces.length ; i++){
                processInterface(profile.interfaces[i])
            }
        }
    }
    if(profile.files){
        if(Array.isArray(profile.files)){
            for(let i = 0; i<profile.files.length; i++ ){
                processOtherFiles(profile.files[i], prePorcess)
            }
        }
    }
}

function processPool(poolConfig) {
    let engine = poolConfig.engine || initialState.engine
    let status = poolConfig.status || initialState.status
    let config ={
        id   : poolConfig.id,
        host : localUtil.configureHost(poolConfig, initialState, status),
        port : localUtil.configurePort(poolConfig, initialState, status)
    }
    config.option = localUtil.configurePool(poolConfig[engine], initialState[engine+'PoolDefault'] || {}, status)
    poolCache.addPool(engines.getEngine(engine).poolConfig(config));
}

function processInterface( interfaceConfig ) {
    if(!interfaceConfig.id){
        throw new Error('interfaces need id')
    }
    let interfaceParams = {
        id        : interfaceConfig.id,
        status    : interfaceConfig.status    || initialState.status,
        engine    : interfaceConfig.engine    || initialState.engine,
        timeout   : interfaceConfig.timeout   || initialState.timeout,
        validator : interfaceConfig.validator || initialState.validator,
		params    : interfaceConfig.params    || initialState.params,
        mock      : interfaceConfig.mock      || initialState.mock
    }
    if(interfaceParams.validator) {
        interfaceParams.scheme = interfaceConfig.scheme
    }
    interfaceParams.port = localUtil.configurePort(interfaceConfig, initialState, interfaceParams.status)
    interfaceParams.host = localUtil.configureHost(interfaceConfig, initialState, interfaceParams.status)
    interfaceParams.customParseReqObj = interfaceConfig.customParseReqObj 
    interfaceParams[interfaceParams.engine] = localUtil.configureEngine(interfaceConfig[interfaceParams.engine], initialState[interfaceParams.engine+'Default'] || {}, interfaceParams.status)

    interfaceCache.pushInterface(new Interface(interfaceParams, engines.getEngine(interfaceParams.engine)))
}

function processOtherFiles(fileName, prePorcess) {
    fileName = path.isAbsolute(fileName)
        ? fileName
        : path.resolve(process.cwd(), fileName)

    let profile = require(fileName)
    if(typeof prePorcess == 'function'){
        prePorcess(profile)
    }
    initInterfaces(profile, prePorcess)
}

module.exports = initInterfaces