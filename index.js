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
	timeout     : 3000,
	httpDefault : {
		method     : 'GET',
		withCookie : false,
		cookie     : '',
		path       : '/'
	}
}
const interfaceCache = {}
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
		throw new Error('interfaces need id')
	}
	let interfaceParams = {
		id      : interfaceConfig.id,
		status  : interfaceConfig.status || initialState.status,
		engine  : interfaceConfig.engine || initialState.engine,
		port    : interfaceConfig.port || initialState.port,
		timeout : interfaceConfig.timeout || initialState.timeout
	}

	if(interfaceConfig.host || interfaceConfig.hosts || interfaceConfig.url || interfaceConfig.urls){
		interfaceParams.host = localUtil.configureHost(interfaceConfig, initialState, interfaceParams.status)
	}
	interfaceParams[interfaceParams.engine] = Object.assign({}, initialState[interfaceParams.engine+'Default'], interfaceConfig[interfaceParams.engine])
	let interfaces = new Interface(interfaceParams, engines[interfaceParams.engine])
	
	interfaceCache[interfaces.id] = interfaces
}

let inter = new RequestProxy('./test')
interfaceCache.getItem.request({
	params: {
		start_date : '2016-09-17',
		end_date : '2016-09-17',
		status : 0
	}
}, console.log, console.error)