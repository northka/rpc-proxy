/**
 * Created by northka.chen on 2016/11/9.
 */
const Cache = {}
let interfaceNum = 0
module.exports ={
    pushInterface : function (interface,force) {
        console.log(interface)
        if(Cache[interface.id]){
            if(force){
                Cache[interface.id] = interface
            }else{
                throw Error('rpc-proxy Error: id is duplicate')
            }
        }else{
            Cache[interface.id] = interface
            ++interfaceNum
        }

    },
    getInterface : function (id){
        return Cache[id]
    }
}