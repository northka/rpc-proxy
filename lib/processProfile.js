/**
 * Created by northka.chen on 2016/11/9.
 */
const path           = require('path')

const localUtil      = require('./util/index')
const interfaceCache = require('./interfaceCache')
const engines        = require('./engines')
const Interface      = require('./Interface')
const rpcProxy       = require('../index')
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
        if(Array.isArray(profile.interfaces)){
            for(let i = 0 ;i < profile.interfaces.length ; i++){
                processInterface(profile.interfaces[i])
            }
        }
    }
    if(profile.files){
        //console.log(profile.files.prototype)
        if(Array.isArray(profile.files)){
            for(let i = 0; i<profile.files.length; i++ ){
                //console.log(rpcProxy)
                processOtherFiles(profile.files[i])
                //rpcProxy.init(profile.files[i])
            }
        }
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
        timeout : interfaceConfig.timeout || initialState.timeout
    }
    interfaceParams.port = localUtil.configurePort(interfaceConfig, initialState, interfaceParams.status)
    interfaceParams.host = localUtil.configureHost(interfaceConfig, initialState, interfaceParams.status)
    interfaceParams[interfaceParams.engine] = Object.assign({}, initialState[interfaceParams.engine+'Default'], interfaceConfig[interfaceParams.engine])

    interfaceCache.pushInterface(new Interface(interfaceParams, engines.getEngine(interfaceParams.engine)))
}

function processOtherFiles(fileName) {
    fileName = path.isAbsolute(fileName)
        ? fileName
        : path.resolve(process.cwd(), fileName)

    let profile = require(fileName)
    initInterfaces(profile)
}

module.exports = initInterfaces