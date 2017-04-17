module.exports = {
	url: 'localhost',
	engine : 'cache',
	interfaces: [
		{
			id: 'getDataFromCache',
			cache: {
				type: 'get',
                beforeCacheId: 'getDataFromServer'
			}
		},
		{
			id: 'setDataCache',
			cache: {
				type: 'set'
			}
		},{
			id:'getDataFromServer',
			port : 9293,
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