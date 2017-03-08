/**
 * Created by northka.chen on 2017/3/8.
 */
function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
        return 'array';
    }
    return propType;
}

function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
        if (propValue instanceof Date) {
            return 'date';
        } else if (propValue instanceof RegExp) {
            return 'regexp';
        }
    }
    return propType;
}

const dataCheck = {
    string: function (value) {
        typeof
    }
}

function valiate(type, value){
    let valueType = getType(value)

}


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
    }
}