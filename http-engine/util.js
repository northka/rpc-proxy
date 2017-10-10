/**
 * Created by nkchen on 2017/9/29.
 */
class util {
    static getRandomInt(min, max) {
        return (Math.random() * (max - min + 1))>>0 + min
    }
    static getHost(hosts){
        if(Array.isArray(hosts)){
            return hosts[util.getRandomInt(0, hosts.length - 1)]
        }else{
            return hosts
        }
    }
    static parseParams ( params){
        if( !params || typeof  params === 'string' ){
            return params || ''
        }else if(params instanceof Array){
            return params.join('&')
        }
        return queryString.stringify( params )
    }
}