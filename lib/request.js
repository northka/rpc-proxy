/**
 * Created by chenchaochao on 16/11/13.
 */
const interfaceCache = require('./lib/interfaceCache')

module.exports = function(id, reqObj){
    return new Promise(function(resolve, reject){
        let interfaces = rpcProxy.getInterface(id)
        interfaces.parseReqObj && interfaces.parseReqObj(reqObj)
        interfaces.request(reqObj, data => resolve(data), data => reject(data))
    })
}
