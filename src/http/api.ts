import { Http,configData} from '../utils/request'
const http = new Http()

//  自动登录
export const baseUrl = configData.host;
export const getBanner = (data) => http.get(baseUrl+'mall/banner', data)
export const getHotArea = (data) => http.get(baseUrl+'mall/square/lists', data)

export const getUserDashboard = (data) => http.get(baseUrl+'mall/user/dashboard', data)
export const getUserWallet = (data) => http.get(baseUrl+'mall/user/wallet', data)