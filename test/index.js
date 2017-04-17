/**
 * Created by northka.chen on 2016/11/10.
 */
const rpcProxy       = require('../index')
const jsonServer     = require('./server').httpJsonServer

describe('Processed the configuration file ',() => {
	rpcProxy.setStatus('dev')
	rpcProxy.init('./test/profile/defaultProfile')

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

		
	})
})	

describe('create server',() => {
    const server = jsonServer()
    server.listen(9292, () => {
        describe('get data successfully', () => {
            let promise = rpcProxy.request('getJson')
            it('callshould return a promise', () => {
                promise.should.be.a.Promise()
            })
            it('response should be an object', (done) => {
                promise.then(data => {
                    data.should.be.a.Object()
                    done()
                })
            })
        })
	})
})

