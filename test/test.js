/**
 * Created by northka.chen on 2016/11/10.
 */

const rpcProxy = require('../index')
rpcProxy.setStatus('dev')
rpcProxy.init('./test/profile')
const jsonServer = require('./server').httpJsonServer
// console.log(rpcProxy.getInterface('getItem').request({
// 	params: {
// 		start_date : '2016-09-17',
// 		end_date : '2016-09-17',
// 		status : 0
// 	}
// }, console.log, console.error))
// rpcProxy.setRequestAfter(function(e,buf){
// 	console.log(e,buf)
// })

// let promise =rpcProxy.request('getJson')

// promise.then((data) => {
// 	console.info(data)
// }, (error) => {
// 	console.error(error)
// })
describe('the interface succeed', () => {
	jsonServer()
	let promise = rpcProxy.request('getJson')
	it('should return a promise', () => {
		promise.should.be.a.Promise()
	})

	it('when getting data succeed', (done) => {
		promise.then((data) => {
			data.should.be.Object()
			done()
		})
	})
})
