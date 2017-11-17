/**
 * Created by northka.chen on 2016/11/18.
 */
const EventEmitter = require('events')

class RequestListener extends EventEmitter{
    constructor(){
        super()
    }
}

module.exports = RequestListener