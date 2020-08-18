import * as constants from '../constants/user'

const INITIAL_STATE = {
  //应用首次加载
	appOnLaunch : true ,
  tokens:{
    token:'',
    openid:'',
    unionid:'',
    user_id:'',
    nickname:'',
    headImgurl:'',
    mobile:''
  },
  site:{
    id:'',
    name:''
  },
  primary:{
    latitude: '',
    longitude: ''
  }
}

export function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.CHANGE_APP_ON_LAUNCH :
			return {
				...state ,
				appOnLaunch : false
			};
    case constants.SET_TOKENS: {
      const  tokens  = JSON.parse(JSON.stringify(action.data))
      return { ...state, tokens }
    }
    case constants.SET_SITE: {
      const  site  = JSON.parse(JSON.stringify(action.data))
      return { ...state, site }
    }
    case constants.SET_PRIMARY: {
      const  primary  = JSON.parse(JSON.stringify(action.data))
      return { ...state, primary }
    }
    default:
      return state
  }
}
