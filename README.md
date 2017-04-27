# rpc-proxy

[![Build status](https://travis-ci.org/northka/rpc-proxy.svg?branch=master)](https://travis-ci.org/northka/rpc-proxy)
<a href="https://www.npmjs.com/package/rpc-proxy"><img src="https://img.shields.io/npm/l/express.svg" /></a>

rpc-proxy是一个远程调用库,使传输层和业务层逻辑隔离。通过配置对所有的远程调用进行统一的处理，简化远程调用的繁琐的适配

## Quick Start
### Installation

```bash
npm install rpc-proxy --save-dev
```
### Configuration
rpc-proxy 自带http-engine和[ajv](https://github.com/epoberezkin/ajv)模块，所以我们以http调用为示例配置

```javaScript
const rpcProxy = require('rpc-proxy')
// 配置选项
let configureation = {
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
rpcProxy.setStatus('dev') //配置先在处于的环境，默认为production
rpcProxy.init(configureation)
```
### Call the interface

在业务层只需要调用request函数，第一个参数写在所要调用接口的id（必填），第二个参数需要动态传递给端口的参数reqObj（选填）。
成功会将数据传给resolve函数，如果失败将会传递给reject函数

```javascript
const request = require('rpc-proxy').request
let dataPromise = request('getJson')
dataPromise.then(data => {
    console.info(data)
}, error =>{
    console.error(error)
})
```

## Contents
- [API](#api)
  - [request](#request)
  - [init](#init)
  - [getInterface](#getInterface)
  - [addEngine](#addEngine)
  - [setStatus](#setStatus)
  - [setRequestBefore](#setRequestBefore)
  - [setRequestAfter](#setRequestAfter)
  - [requestListener](#requestListener)
  - [setEngineDefault](#setEngineDefault)