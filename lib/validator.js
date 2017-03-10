/**
 * Created by northka.chen on 2017/3/8.
 */
const isIntRegexp = /^\d{1,10}$/

const valiate = {
    isString: function(value){
        if(typeof str == 'string'){
            return true
        }else{
            return false
        }
    },
    isNumber: function(value){
        if(typeof str === 'number'){
            return true
        }else{
            return false
        }
    },
    isInt: function(str){
        if(isIntRegexp.test(str)){
            return true
        }else {
            return false
        }
    },
    isDate: function(value){
        let date = new Date(value)
        if(date.toString() === 'Invalid Date'){
            return true
        }else{
            return false
        }
    },
    isObject: function (value) {
        if(typeof value == 'object'){
            return true
        }else{
            return false
        }
    },
    isArray: function (value) {
        if(Array.isArray(value)){
            return true
        }else{
            return false
        }
    },
    isRegExp: function (value) {
        if(typeof value == 'object' && value instanceof RegExp){
            return true
        }else{
            return false
        }
    },
    testRegExp: function (type, value) {
        if(typeof value == 'object' && type instanceof RegExp){
            return type.test(value)
        }else{
            return false
        }
    }
}

module.exports = function(type, param){
    switch (type.toLowerCase()){
        case 'string':
            return valiate.isString(param)
        case 'number':
            return valiate.isNumber(param)
        case 'int'   :
            return valiate.isInt(param)
        case 'date'  :
            return valiate.isDate(param)
        case 'object':
            return valiate.isObject(param)
        case 'array':
            return valiate.isArray(param)
        case 'regexp':
            return valiate.isRegExp(param)
        case 'testregexp' :
            return valiate.testRegExp(type, param)
    }
}