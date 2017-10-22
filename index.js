const path = require('path')

const processProfile		= require('./lib/processProfile')
const {getInterface}		= require('./lib/interfaceCache')
const {addEngine}       	= require('./lib/engines')
const request       		= require('./lib/request')
const {setRequestBefore, setRequestAfter}     = require('./lib/modifyGlobalFunc')
const init          		= require('./lib/init')

module.exports ={
	init,
	getInterface ,
	addEngine,
	setRequestBefore,
	setRequestAfter,
	request : function (id, reqobj) {
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
	},
    setStatus    : (status) => {
        processProfile({status})
    },
	setEgine: (engine)=>{
		processProfile({engine})
	}
}