/**
 * Created by chenchaochao on 16/11/13.
 */
const interfaceCache = require('./interfaceCache')
const cache          = require('./cache')

module.exports = function(id, reqObj){
    return new Promise(function(resolve, reject){
        if(!Array.isArray(id)){
            id = [id]
        }
        let cur = 0
        request(id[cur])
        function failCb(data) {
            ++cur
            if(cur < id.length){
                request(id[cur])
            }else{
                reject(data)
            }
        }
        function successCb(data) {
            let interfaces = interfaceCache.getInterface(id[cur])
            if(interfaces.validator){
                let dataValidate = interfaces.validator(data)
                if(dataValidate){
                    resolve(data)
                }else{
                    failCb()
                }
            }else{
                resolve(data)
            }
        }
        function request(id) {
            let interfaces = interfaceCache.getInterface(id)
            if(interfaces == undefined){
                throw new Error('no this interface :'+ id)
            }
            reqObj = reqObj === undefined ? {} : reqObj
            interfaces.parseReqObj && interfaces.parseReqObj(reqObj)
            interfaces.request(reqObj, successCb, failCb)
        }
    })
}
