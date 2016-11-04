const fs = require('fs')
const util = require('util')

const localUtil = require('./util')
const Interface = require('./Interface')

const initialState = {
	status      : 'production',
	url         : '',
	port        : 80,
	host        : 'localhost',
	engine      : 'http',
	httpDefault : {
		method     : 'GET',
		withCookie : false,
		cookie     : '',
		path       : '/'
	}
}
const interfaceCache = []
const engines = {
	http: require('./http-engine/index')
}

function RequestProxy(profile){
	if(typeof profile ==='string'){
		this._module = require(profile)
	}
	this.process()
}

RequestProxy.prototype.process = function() {
	Object.assign(initialState, this._module)
	if(initialState.interfaces){
		Array.isArray(initialState.interfaces) && initialState.interfaces.forEach(this.processInterfaces)
	}
}

RequestProxy.prototype.processInterfaces = function(interfaceConfig, index) {
	if(!interfaceConfig.id){
		let error
		throw new Error('interfaces need id')
	}
	let interfaceParams = {
		id     : interfaceConfig.id,
		status : interfaceConfig.status || initialState.status,
		engine : interfaceConfig.engine || initialState.engine,
		port   : interfaceConfig.port || initialState.port
	}

	if(interfaceConfig.host || interfaceConfig.hosts || interfaceConfig.url || interfaceConfig.urls){
		interfaceParams.host = localUtil.configureHost(interfaceConfig, initialState, interfaceParams.status)
	}
	interfaceParams[interfaceParams.engine] = Object.assign({}, initialState[interfaceParams.engine+'Default'], interfaceConfig[interfaceParams.engine])
	let interfaces = new Interface(interfaceParams, engines[interfaceParams.engine])
	
	interfaceCache.push(interfaces)
}

let inter = new RequestProxy('./test')
console.log(interfaceCache)