/**
 * Created by northka.chen on 2016/11/10.
 */
module.exports = {
	status: 'online',
	urls   : {
		online: '10.10.62.103'
	},
	method : 'GET',
	engine : 'http',
    port   : 9299,
	interfaces : [
		{
			id   : 'getItem',
			http : {
				path : '/admin/v1/activitys-guess/history'
			}
		}
	]
}