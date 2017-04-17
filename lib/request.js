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
        let cur = 0,state= 'initial'
        let interfaces = interfaceCache.getInterface(id[cur])
        if(interfaces == undefined){
            throw new Error(`no this interface : ${id[cur]}`)
        }
        request(interfaces)
        function failCb(data) {
            if(state == 'initial'){
                ++cur
            }else{
                state = 'hadUsedCache'
                request(interfaces)
            }
            if(cur < id.length){
                request(id[cur])
            }else{
                reject(data)
            }
        }
        function successCb(data) {
            let curInterface
            if(state == 'initial' || state == 'hadUsedCache'){
                curInterface = interfaces
            }else{
                curInterface = interfaceCache.getInterface(interfaces.option.beforeCacheId)
            }
            if(curInterface.validator){
                if(curInterface.validator(data)){
                    resolve(data)
                }else{
                    failCb()
                }
            }else if(state == 'beforeCache' && interfaces.validator && !interfaces.option.validatorNotforCache){
                if(interfaces.validator(data)){
                    resolve(data)
                }else{
                    failCb()
                }
            }else{
                resolve(data)
            }
        }
        function request(interfaces) {
            if(state == 'initial' && interfaces.option.beforeCacheId){
                state = 'beforeCache'
                let cacheInterface = interfaceCache.getInterface(interfaces.option.beforeCacheId)
                request(cacheInterface)
                return
            }
            reqObj = reqObj === undefined ? {} : reqObj
            interfaces.parseReqObj && interfaces.parseReqObj(reqObj)
            interfaces.request(reqObj, successCb, failCb)
        }
    })
}
