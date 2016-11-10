
function Interface(params, engine){
	this.id      = params.id
	this.status  = params.status
	this.host    = params.host
	this.port    = params.port
	this.engine  = params.engine
	this.option  = params[this.engine]
	Object.assign(this, engine)
}
Interface.prototype = {
	getId : function(){
		return this.id
	}
}

module.exports = Interface