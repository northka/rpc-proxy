module.exports = {
	configureHost : function ( interface, initialState, status ){
		if(interface.host) 
			return interface.host
		if(interface.hosts && status)
			return interface.hosts[status]
		if(interface.url)
			return interface.url
		if(interface.urls && status)
			return interface.urls[status]
		if(initialState.host)
			return initialState.host
		if(initialState.hosts && status)
			return initialState.hosts[status]
		if(initialState.url)
			return initialState.url
		if(initialState.urls && status)
			return initialState.urls[status]
		throw new Error('Interface need set host or url')
	}
}