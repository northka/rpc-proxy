/**
 * Created by chenchaochao on 16/11/13.
 */
const interfaceCache = require('./interfaceCache')

module.exports = function(id, reqObj){
    return new Promise(function(resolve, reject){
        let interfaces = interfaceCache.getInterface(id)
        interfaces.parseReqObj && interfaces.parseReqObj(reqObj)
        interfaces.request(reqObj, data => resolve(data), data => reject(data))
    })
}
