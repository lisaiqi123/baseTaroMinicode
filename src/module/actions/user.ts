import * as constants from '../constants/user'

export const setTokens = (data: any) => {
  return {
    data,
    type: constants.SET_TOKENS
  }
}
export const setSite = (data: any) => {
  return {
    data,
    type: constants.SET_SITE
  }
}
export const setPrimary = (data: any) => {
  return {
    data,
    type: constants.SET_PRIMARY
  }
}
//更改登录状态
export const changeAppOnLaunch = () => ({
	type : constants.CHANGE_APP_ON_LAUNCH
})
