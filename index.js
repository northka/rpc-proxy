const path = require('path')

const processProfile = require('./lib/processProfile')
const interfaceCache = require('./lib/interfaceCache')
const engines        = require('./lib/engines')
const request        = require('./lib/request')
const modifyGlobalFunc     = require('./lib/modifyGlobalFunc')
const requestListener  = require('./lib/requestListener')

module.exports ={
	init         : (fileName) =>{
		if(typeof fileName ==='string'){
			fileName = path.isAbsolute(fileName)
				? fileName
				: path.resolve(process.cwd(), fileName)

			let profile = require(fileName)
			processProfile(profile)
		}else if(fileName !== null && typeof fileName === 'object'){
			processProfile(fileName)
		}
	},
	getInterface : (id) => {
		return interfaceCache.getInterface(id)
	},
	addEngine    : engines.addEngine,
	setStatus    : (status) => {
		processProfile({status})
	},
	setRequestBefore : modifyGlobalFunc.setRequestBefore,
	setRequestAfter  : modifyGlobalFunc.setRequestAfter,
	requestListener,
	request : function (id,reqobj) {
		if(typeof id === 'string'){
			return request(id, reqobj)
		}else{
			if(typeof reqobj == "object"){
				if(reqobj.id != undefined && typeof reqobj.id == 'string'){
					return request(reqobj.id, reqobj)
				}else{
					throw new Error('parameter error: request need id')
				}
			}
		}
	},
	setEngineDefault: (engine, defaults) => {
		let engineDefault = {}
		engineDefault[engine+'Default'] = defaults
		processProfile({engineDefault})
	}
}