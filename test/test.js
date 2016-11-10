/**
 * Created by northka.chen on 2016/11/10.
 */

const rpcProxy = require('../index')

rpcProxy.init('./test/profile')
console.log(rpcProxy.getInterface('getItem').request({
	params: {
		start_date : '2016-09-17',
		end_date : '2016-09-17',
		status : 0
	}
}, console.log, console.error))