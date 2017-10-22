/**
 * Created by northka.chen on 2016/11/15.
 */
const globalFunc = require('./globalFunc')
module.exports = {
    setRequestBefore : (func) => {
        if(typeof func == 'function'){
            globalFunc.requestBefore = func
        }else{
            throw error('RequestBefore must be a function')
        }
    },
    setRequestAfter : (func) => {
        if(typeof func == 'function'){
            globalFunc.requestAfter = func
        }else{
            throw error('setRequestAfter must be a function')
        }
    }
}