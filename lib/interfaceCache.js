/**
 * Created by northka.chen on 2016/11/9.
 */
const Cache = {}
let interfaceNum = 0
module.exports ={
    pushInterface : function (interface,force) {
        if(Cache[interface.id]){
            if(force){
                Cache[interface.id] = interface
            }else{
                throw Error('id is duplicate')
            }
        }else{
            Cache[interface.id] = interface
            ++interfaceNum
        }

    },
    getInterface : function (id){
        if( Cache[id] === 'undefined' ){
            throw  new Error('no this interface :' + id)
        }
        return Cache[id]
    }
}