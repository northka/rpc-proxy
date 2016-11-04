module.exports = {
	status: 'online',
	urls   : {
		online: 'http://baidu.lecai.com'
	},
	method : 'GET',
	engine   : 'http',
	interfaces : [
		{	
			id   : 'getItem',
			url  : '10.10.62.103',
			port : 9299,
			urls : {
				online : '/lottery/draw/ajax_get_detail.php'
			}
		},
		{	
			id   : 'getItem1',
			url  : '/lottery/draw/ajax_get_detail.php',
			urls : {
				online : '/lottery/draw/ajax_get_detail.php'
			}
		}
	]
}