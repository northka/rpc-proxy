/**
 * Created by chenchaochao on 16/11/13.
 */
const path           = require('path')
const interfaceCache = require('./interfaceCache')
const cache          = require('./cache')
const globalFunc     = require('./globalFunc')
const poolCache      = require('./poolCache')
const Mock           = require('mockjs')

module.exports = function(id, reqObj = {}){
    return new Promise(function(resolve, reject){
        if(!Array.isArray(id)){
            id = [id]
        }
        let cur = 0,
            ret = globalFunc.requestBefore(id, reqObj)
        request(id[cur])
        function failCb(data) {
            ++cur
            if(cur < id.length){
                request(id[cur])
            }else{
                globalFunc.requestAfter(data, ret, id[cur -1], reqObj, 'fail')
                reject(data)
            }
        }
        function successCb(data) {
            if(cur >= id.length){
                return;
            }
            let interfaces = interfaceCache.getInterface(id[cur])
            ++cur
            if(interfaces.validator){
                let dataValidate = interfaces.validator(data)
                if(dataValidate){
                    globalFunc.requestAfter(data, ret, id[cur -1], reqObj, 'success')
                    resolve(data)
                }else{
                    failCb()
                }
            }else{
                globalFunc.requestAfter(data, ret, id[cur-1], reqObj, 'success')
                resolve(data)
            }
        }
        function request(id) {
            let interfaces = interfaceCache.getInterface(id)
            if(interfaces == undefined){
                throw new Error('no this interface :'+ id)
            }
            if (interfaces.mock !== undefined && interfaces.mock !== false){
                if (typeof this.mock === 'string'){
                    // mock 传入的为路径
                    if (path.isAbsolute(this.mock)) {
                        successCb(require(this.mock))
                    } else {
                        const absolutePath = path.resolve(__dirname, this.mock)
                        successCb(require(absolutePath))
                    }
                } else {
                    successCb(Mock.mock(this.mock))
                }
                return
            }
			reqObj.params = Object.assign({}, interfaces.params, reqObj.params)
			interfaces.customParseReqObj && interfaces.customParseReqObj(reqObj)
			interfaces.parseReqObj && interfaces.parseReqObj(reqObj)
            if(interfaces.option.poolId){
				const pool = poolCache.getPool(interfaces.option.poolId)
                interfaces.request(reqObj, successCb, failCb, pool)
            }else{
                interfaces.request(reqObj, successCb, failCb)
            }

        }
    })
}
