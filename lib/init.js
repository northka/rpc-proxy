/**
 * Created by nkchen on 2017/9/29.
 */
const processProfile = require('./processProfile')

module.exports = function (fileName, preprocess) {
    if(typeof fileName ==='string'){
        fileName = path.isAbsolute(fileName)
            ? fileName
            : path.resolve(process.cwd(), fileName)
        let profile = require(fileName)
        processProfile(profile, preprocess)
    }else if(fileName !== null && typeof fileName === 'object'){
        processProfile(fileName, preprocess)
    }
};