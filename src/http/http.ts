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
const baseUrl = configData.host

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
        if(Taro.$store.getState().user.tokens.token.length == 0){
          await userLogin()
        }
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

// 获取微信登录凭证
const wxLogin = async () => {
  try {
      const res = await Taro.login();
      return res.code
  } catch (error) {
      console.log('微信获取临时凭着失败')
  }
}
async function login(data: object){
  const res = await Taro.request({
    url: `${baseUrl}mall/token`, //仅为示例，并非真实的接口地址
    data: data,
    method:'POST',
    header: {
      'content-type': contentType,
      'appid': appid,
      'Accept': Accept,
    },
  })
  return res.data
}

const userLogin = async () => {
  try {
    await Taro.checkSession()
    if (!Taro.getStorageSync('token')) {
      throw new Error('本地没有缓存token')
    }
  } catch (error) {
    const code = await wxLogin()
    const loginRes = await login({
      code
    })
    Taro.setStorageSync('tokens',loginRes.data);
    Taro.$store.dispatch(setTokens(loginRes.data))
  }
}
