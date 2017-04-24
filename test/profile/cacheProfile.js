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
			port : 9293,
			http : {
				path: '/getUserInfo',
				beforeCacheId: 'getDataFromCache'
			},
			engine: 'http'
		}
	],
	pools: [{
		cache: {
		}
	}]
}