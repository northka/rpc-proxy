const globalFunc = require('./globalFunc')
const validator  = require('./validatorCache')

const ajv = new Ajv()
function Interface(params, engine){
	this.id         = params.id
	this.status     = params.status
	this.host       = params.host
	this.port       = params.port
	this.engine     = params.engine
	this.timeout    = params.timeout
	this.option     = params[this.engine]
	if(params.validator){
		this.validator = validator.getValidator(params.validator, params.scheme)
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