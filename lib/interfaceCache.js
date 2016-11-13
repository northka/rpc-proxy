/**
 * Created by northka.chen on 2016/11/9.
 */
const Cache = {}
let interfaceNum = 0
module.exports ={
    pushInterface : function (interface,force) {
        if(Cache[interface.id]){
            Cache[interface.id] = interface
            ++interfaceNum
        }else{
            if(force){
                Cache[interface.id] = interface
            }else{
                throw Error('id is duplicate')
            }
        }

    },
    getInterface : function (id){
        return Cache[id]
    },

}