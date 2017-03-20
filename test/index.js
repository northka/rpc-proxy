/**
 * Created by northka.chen on 2016/11/10.
 */
const rpcProxy       = require('../index')
const AssertionError = require('assert').AssertionError
const jsonServer     = require('./server').httpJsonServer
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

describe('Processed the configuration file ',() => {
	before((done) => {
		const server = jsonServer()
		server.listen(9292, () => done())
	})
	
	describe('setStatus', () => {
		rpcProxy.setStatus('dev')
	})

	describe('processing the configuration file',() => {
		it('with no error',() => {
			(() => rpcProxy.init('./test/profile/defaultprofile')).should.not.throw(AssertionError)
		})
	})

	describe('getInterface', () =>{
		it('when no this interface', () => {
			(typeof rpcProxy.getInterface('noInterface')).should.equal('undefined')
		})
		it('when get a interface', () => {
			let tempInterface = rpcProxy.getInterface('getJson')
			tempInterface.should.be.Object()
			tempInterface.should.have.property('request')
			tempInterface.should.have.property('parseReqObj')
		})

		it('calling request should return a promise', () => {
			let promise = rpcProxy.request('getJson')
			promise.should.be.a.Promise()
		})
	})
})





