/**
 * Created by northka.chen on 2016/11/10.
 */
module.exports = {
    configureHost : function ( interface, initialState, status ){
        if(interface.host)
            return interface.host
        if(interface.hosts)
            return interface.hosts[status]
        if(interface.url)
            return interface.url
        if(interface.urls)
            return interface.urls[status]
        if(initialState.host)
            return initialState.host
        if(initialState.hosts)
            return initialState.hosts[status]
        if(initialState.url)
            return initialState.url
        if(initialState.urls)
            return initialState.urls[status]
        throw new Error('Interface need set host or url')
    },
    configurePort : function ( interface, initialState, status){
        if(interface.ports)
            return interface.ports[status]
        if(interface.port)
            return interface.port
        if(initialState.ports)
            return initialState.ports[status]
        if(initialState.port)
            return initialState.port
        
    },
    configureEngine: function (interface, defaultSetting, status) {
        if(interface[status])
            return configureEngine(interface[status], defaultSetting, status)
        if(defaultSetting[status])
            return configureEngine(interface, defaultSetting[status], status)
        return Object.assign({}, defaultSetting, interface)
    }
}