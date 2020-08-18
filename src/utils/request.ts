import Taro from '@tarojs/taro'

import env from '../config/env'
import { setTokens } from '../module/actions/user'
export const configData = {
    host: `${env.baseUrl}`,
    hostImg: `${env.imgUrl}`,
    env: `${env.env}`,
    appid:`${env.appid}`,
    Accept:`${env.Accept}`,
    qqmapKey:`${env.qqmapKey}`,
    formId:`${env.formId}`,
}

type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE'


// 后端是否支持json格式
const contentType = 'application/x-www-form-urlencoded'
const Accept = configData.Accept
const appid = configData.appid

export class Http {
  noNeedToken = ['mockFakeApi']

  get(url: string, data: object) {
    return this.commonHttp('GET', url, data)
  }

  post(url: string, data: object) {
    return this.commonHttp('POST', url, data)
  }

  async commonHttp(method: HttpMethods, url: string, data: object) {
    return new Promise<any>(async (resolve, reject) => {
      Taro.showNavigationBarLoading()
      try {
        const res = await Taro.request({
          url,
          method,
          data,
          header: {
            'content-type': contentType,
            'appid': appid,
            'Accept': Accept,
            'token': Taro.$store.getState().user.tokens.token,
            'openid': Taro.$store.getState().user.tokens.openid,
            'userId': Taro.$store.getState().user.tokens.user_id,
            'siteId': Taro.$store.getState().user.site.id,
          
          }
        })
        Taro.hideNavigationBarLoading()
        switch (res.statusCode) {
          case 200:
            return resolve(res.data)
          default:
            console.log(res.data.message)
            reject(new Error(res.data.message))
        }
      } catch (error) {
        Taro.hideNavigationBarLoading()
        reject(new Error('网络请求出错'))
      }
    })
  }
}