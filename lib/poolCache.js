/**
 * Created by nkchen on 2017/9/29.
 */
const poolCache = []
module.exports = {
    addPool: function (pool) {
        const length = poolCache.length
        for (let i = 0; i < length; i++) {
            if (poolCache[i].id == pool.id) {
                throw new Error('pool id 重复')
            }
        }
        poolCache.push(pool)
    },
    getPool: function (id) {
        const length = poolCache.length
        for(let i = 0;i < length; i++){
            if(poolCache[i].id == id){
                return poolCache[i]
            }
        }
        throw new Error('could not find the pool: '+ id)
    }
}