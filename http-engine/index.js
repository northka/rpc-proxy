const queryString = require('querystring')
const http        = require('http')

const BufferHelper = require('./bufferHelper')

function getRandomInt(min, max) {
    return (Math.random() * (max - min + 1))>>0 + min;
}
function getHost(){
	if(Array.isArray(this.host)){
		return this.host[getRandomInt(0, this.host.length - 1)]
	}else{
		return this.host
	}
}
function parseParams ( params){
	if( !params || typeof  params === 'string' ){
		return params || ''
	}else if(params instanceof Array){
		return params.join('&')
	}
	return queryString.stringify( params )
}
module.exports = {
	request: function(reqObj, successCallback, errorCallback, cookie) {

		let option = {
			host: getHost.call(this),
			port: this.port,
			path: this.option.path,
			method: this.option.method,
			headers: this.option.headers
		},
			self = this
		let query = parseParams(reqObj.params)
		if ( option.method === 'POST' ){
			option.headers[ 'Content-Length' ] = query.length
			option.headers[ 'Content-Type']    = 'application/x-www-form-urlencoded'
		}else if(option.method === 'GET'){
			option.path += '?' + query
		}

		let req = http.request( option, (res) => {
			let bufferHelper = new BufferHelper()
			let timer = setTimeout( function() {
				errorCallback( 'error' );
			}, self.timeout );
			res.on('data', (chunk) =>{
				bufferHelper.concat( chunk )
			})
			res.on('end', () => {
				let buf = bufferHelper.toBuffer()
				let result
				if(option.encoding === 'raw'){
					result = buf
				}else{
					if( res.headers['content-type'].indexOf('application/json') >= 0){
						result = JSON.parse(buf.toString())
					}else{
						result = buf.toString()
					}
				}
				successCallback(result, res.headers[ 'set-cookie'])
			})
		})
		option.method === 'GET' || req.write( query )
		req.on( 'error', (e) => {
			errorCallback(e)
		})
		req.end()
	}
}