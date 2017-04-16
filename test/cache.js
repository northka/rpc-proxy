const rpcProxy       = require('../index')
const cacheEngine    = require('cache-engine')
const jsonServer     = require('./server').httpJsonServer
rpcProxy.addEngine('cache', cacheEngine)
rpcProxy.init('./test/profile/cacheProfile')
rpcProxy.request('setDataCache',{key:'test',value:'123'})
let promise = rpcProxy.request('getDataFromCache',{key:'test'})
promise.then(data => {
	console.log(data)
})
const server = jsonServer()
server.listen(9292, () => {
	let httpPromise= rpcProxy.request('getDataFromServer')
	httpPromise.then(data => {
		console.log(data)
	})
})
