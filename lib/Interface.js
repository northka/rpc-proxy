const validator  = require('./validatorCache')
const logger     = plug('logger')

function Interface(params, engine){
	this.id         = params.id
	this.status     = params.status
	this.host       = params.host
	this.port       = params.port
	this.engine     = params.engine
	this.timeout    = params.timeout
	this.params     = params.params
	this.option     = params[this.engine]
    logger.info(params)
	if(params.validator){
		this.validator = validator.getValidator(params.validator, params.scheme)
	}else{
		this.validator = false
	}
	this.customParseReqObj = params.customParseReqObj
	Object.assign(this, engine)
}
Interface.prototype = {
	getId : function(){
		return this.id
	}
}

module.exports = Interface