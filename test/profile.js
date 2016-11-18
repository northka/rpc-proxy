/**
 * Created by northka.chen on 2016/11/10.
 */
module.exports = {
	urls   : {
		online: '10.10.62.103',
		dev   : '127.0.0.1'
	},
	engine : 'http',
    port   : 9299,
	timeout: 3000,
	interfaces : [
		{
			id   : 'getItem',
			http : {
				path : '/admin/v1/activitys-guess/history'
			}
		}



	],
	// files : [
	// 	'./test/profile'
	// ]
}