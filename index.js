const processProfile = require('./lib/processProfile')
const interfaceCache = require('./lib/interfaceCache')

module.exports ={
	init:(fileName) =>{
		if(typeof fileName ==='string'){
			let profile = require(fileName)
			processProfile(profile)
		}
	},
	getInterface : (id) => {
		return interfaceCache.getInterface(id)
	}
}