module.exports = {
	url: 'localhost',
	engine : 'cache',
	interfaces: [
		{
			id: 'getDataFromCache',
			cache: {
				type: 'get'
			}
		},
		{
			id: 'setDataCache',
			cache: {
				type: 'set'
			}
		},{
			id:'getDataFromServer',
			port : 9292,
			http : {
				path: '/getUserInfo'
			},
			engine: 'http'
		}
	],
	pools: [{
		cache: {
		}
	}]
}