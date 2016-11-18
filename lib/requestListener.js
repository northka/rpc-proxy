/**
 * Created by northka.chen on 2016/11/18.
 */
const EventEmitter = require('events')
const util         = require('util')

function RequestListener() {
    if(!this instanceof RequestListener){
        return new RequestListener()
    }
    EventEmitter.call(this)
}
util.inherits(RequestListener,EventEmitter)

module.exports = RequestListener