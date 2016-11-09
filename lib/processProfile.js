/**
 * Created by northka.chen on 2016/11/9.
 */
const interfaceCache = require('./interfaceCache')
const initialState = {
    status      : 'production',
    url         : '',
    port        : 80,
    host        : 'localhost',
    engine      : 'http',
    timeout     : 3000,
    httpDefault : {
        
        method     : 'GET',
        withCookie : false,
        cookie     : '',
        path       : '/'
    }
}