/**
 * Created by northka.chen on 2017/3/10.
 */
const validator = require('./valiator')

function verifyObject (scheme, data){
    if(scheme.properties){
        let propertiesArr = Object.keys(scheme.properties)
        for(let i = 0 ;i < propertiesArr.length ; i ++){
            if(data[propertiesArr[i]]) {
                throw new Error('missing data')
            }
            verify(scheme[propertiesArr[i]], data[propertiesArr[i]])
        }
        return
    }
    if(scheme.type){
        if(!validator(scheme.type, data)) {
            throw new Error('missing data')
        }
    }
}

function verifyArray (scheme, data) {
    if(!validator('Array', data)){
        throw new Error('Missing Data')
    }
    for(let i = 0; i < scheme.length; i++){
        if(data[i] === undefined){
            throw new Error('Missing Data')
        }
        verify(scheme[i], data[i])
    }
}

function verifyString(scheme, data) {
    if(scheme !== data){
        throw new Error('Missing Data')
    }
}

function verfiyRegExp(scheme, data) {
    if(!scheme.test(data)){
        throw new Error('Missing Data')
    }
}

function verify(scheme, data) {
    if(valiator('Object', scheme)){
        verificateObject(scheme, data)
    }else if(validator('Array', scheme)){
        verifyArray(scheme, data)
    }else if(validator('String', scheme)){
        verifyString(scheme, data)
    }else if(validator('RegExp', scheme)){
        verfiyRegExp(scheme, data)
    }
}