/**
 * Created by northka.chen on 2017/3/15.
 */
const http = require('http')

exports.httpJsonServer = function(){
	let server = http.createServer((req, res) => {
		res.writeHead(200, {'content-type':'application/json'})
		res.end(JSON.stringify({
			code: 200,
			data: {
				name : 'northka',
				sex  : 0,
				info : {
					company : ['唯品会', '迅雷'],
					salary  : '*'
				}
			}
		}))
	})
	return server
}
