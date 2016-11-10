/**
 * Created by northka.chen on 2016/11/9.
 */

const engines = {
    http: require('../http-engine/index')
}

module.exports ={
    addEngine : (engineName,engine) =>{
        engines[engineName] = engine
    },
    getEngine : (name) => {
        return engines[name]
    }
}
