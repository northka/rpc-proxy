const globalFunc = require('./globalFunc')
const Ajv        = require('ajv')

const ajv = new Ajv()
function Interface(params, engine){
	this.id         = params.id
	this.status     = params.status
	this.host       = params.host
	this.port       = params.port
	this.engine     = params.engine
	this.timeout    = params.timeout
	this.option     = params[this.engine]
	if(params.scheme){
		this.validator = ajv.compile(params.validator)
	}else{
		this.validator = false
	}
	this.globalFunc = globalFunc
	Object.assign(this, engine)
}
Interface.prototype = {
	getId : function(){
		return this.id
	}
}

module.exports = Interface