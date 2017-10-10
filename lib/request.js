/**
 * Created by chenchaochao on 16/11/13.
 */
const interfaceCache = require('./interfaceCache')
const cache          = require('./cache')
const globalFunc     = require('./globalFunc')
const logger         = plug('logger')
module.exports = function(id, reqObj){
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
                logger.info('fail');
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
            reqObj = reqObj === undefined ? {} : reqObj
			reqObj.params = Object.assign({}, interfaces.params, reqObj.params)
			interfaces.customParseReqObj && interfaces.customParseReqObj(reqObj)
			interfaces.parseReqObj && interfaces.parseReqObj(reqObj)
            interfaces.request(reqObj, successCb, failCb)
        }
    })
}
