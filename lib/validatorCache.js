const Ajv  = require('ajv')
const ajv = new Ajv()
const validatorCache = {
	json : (scheme) => {
		return ajv.compile(scheme)
	}
}

module.exports = {
	getValidator: (type, scheme) => {
		type = type.toLowerCase()
		if(validatorCache[type] == undefined){
			throw new Error('no this validator')
		}
		if(typeof validatorCache[type] == 'function'){
			return validatorCache[type](scheme)
		}
		return validatorCache[type]
	},
	addValidator: (type, force) => {
		type = type.toLowerCase()
		if(validatorCache[type] == undefined){
			throw new Error('has this validator')
		}
		return validatorCache[type]
	}
}