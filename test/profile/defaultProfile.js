/**
 * Created by northka.chen on 2016/11/10.
 */
module.exports = {
	urls   : {
		online: '10.10.62.103',
		dev   : 'localhost'
	},
	engine : 'http',
    port   : 9292,
	timeout: 3000,
	httpDefault: {
		
	},
	validator: 'json',
	interfaces : [
		{
			id   : 'getJson',
			http : {
				path: '/getUserInfo'
			},
			scheme: {
				properties: {
                    code: {type: 'number'},
                    data: {
                        type: 'object',
                        properties: {
                            name: {type: 'string'},
                            sex : {type: 'number'},
                            info: {
                                type: 'object',
                                properties: {
                                    company: {type: 'array',items: {
                                        type: 'string'
                                    }},
                                    salary : {type: 'string'}
                                }
                            }
                        }
                    }
                }
			}
		}
	]
}