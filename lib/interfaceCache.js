/**
 * Created by northka.chen on 2016/11/9.
 */
const Cache = {}
module.exports ={
    pushInterface : function (interface) {
        Cache[interface.id] = interface
    },
    getInterface : function (id){
        return Cache[id]
    }
}