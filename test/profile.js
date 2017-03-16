/**
 * Created by northka.chen on 2016/11/10.
 */
module.exports = {
	urls   : {
		online: '10.10.62.103',
		dev   : '127.0.0.1'
	},
	engine : 'http',
    port   : 9292,
	timeout: 3000,
	interfaces : [
		{
			id   : 'getJson',
			http : {
				path : '/getUserInfo'
			}
		}
	]
}