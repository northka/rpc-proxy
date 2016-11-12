const path = require('path')

const processProfile = require('./lib/processProfile')
const interfaceCache = require('./lib/interfaceCache')
const engines        = require('./lib/engines')

module.exports ={
	init         : (fileName) =>{
		if(typeof fileName ==='string'){
			fileName = path.isAbsolute(fileName)
				? fileName
				: path.resolve(process.cwd(), fileName)

			let profile = require(fileName)
			processProfile(profile)
		}
	},
	getInterface : (id) => {
		return interfaceCache.getInterface(id)
	},
	addEngine    : engines.addEngine
}