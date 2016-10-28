const fs = require('fs')
const util = require('util')

const initialState = {
	status     : '',
	url        : '',
	method     : 'GET',
	port       : 80,
	host       : 'localhost',
	cookies    : '',
	withCookie : false
}
const interfaceCache = []

function Interface(profile){
	if(typeof profile ==='string'){
		this._module = require(profile)
	}
	this.process()
}

Interface.prototype.process = function() {
	Object.assign(initialState, this._module)
	if(initialState.interfaces){
		Array.isArray(initialState.interfaces) && initialState.interfaces.forEach(this.processInterfaces)
	}
}

Interface.prototype.processInterfaces = function(interface, index) {
	if(!interface.id){
		throw new Error('')
	}
	
}

let inter = new Interface('./test')