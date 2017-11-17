/**
 * Created by northka.chen on 2016/11/9.
 */
const Cache = {}
let interfaceNum = 0
module.exports ={
    pushInterface : function (interfaces,force) {
        if(Cache[interfaces.id]){
            if(force){
                Cache[interfaces.id] = interfaces
            }else{
                throw Error('rpc-proxy Error: id is duplicate')
            }
        }else{
            Cache[interfaces.id] = interfaces
            ++interfaceNum
        }

    },
    getInterface : function (id){
        return Cache[id]
    }
}