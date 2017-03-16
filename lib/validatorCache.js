const Ajv  = require('ajv')

const validatorCache = {
	json : (scheme) => {
		return ajv.compile(scheme)
	}
}

module.exports = {
	getValidator: (type) => {
		return validatorCache[type]
	},
	addValidator: (type, validator) => {
		validatorCache[type] = validator
	}
}