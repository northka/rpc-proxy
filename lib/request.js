/**
 * Created by chenchaochao on 16/11/13.
 */
const interfaceCache = require('./interfaceCache')
const cache          = require('./cache')

module.exports = function(id, reqObj){
    return new Promise(function(resolve, reject){
        let interfaces = interfaceCache.getInterface(id)
        if(interfaces == undefined){
            throw new Error('no this interface :'+ id)
        }
        reqObj = reqObj === undefined ? {} : reqObj
        interfaces.parseReqObj && interfaces.parseReqObj(reqObj)
        if(interfaces.cache != undefined){
            let next
            cache(reqObj, next, data => resolve(data))
            if(next){
                return
            }
        }
        function success(data) {
            if(interfaces.validator){
                let dataValidate = interfaces.validator(data)
                if(dataValidate){
                    resolve(data)
                }else{
                    reject(new Error('data structure is not correct'))
                }
            }
        }
        interfaces.request(reqObj, success, (...data) => reject(...data))
    })
}
