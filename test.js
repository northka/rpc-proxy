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
			url  : '/lottery/draw/ajax_get_detail.php',
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