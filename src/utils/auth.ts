import Taro from '@tarojs/taro'
import { setTokens , changeAppOnLaunch } from '../module/actions/user'
import env from '../config/env'

export const configData = {
    host: `${env.baseUrl}`,
    hostImg: `${env.imgUrl}`,
    env: `${env.env}`,
    appid:`${env.appid}`,
    Accept:`${env.Accept}`,
    qqmapKey:`${env.qqmapKey}`,
    formId:`${env.formId}`,
}
const baseUrl = configData.host
const contentType = 'application/x-www-form-urlencoded'
const Accept = configData.Accept
const appid = configData.appid
//获取数据
export default class Auth {
	//app授权
	static appCheckAuth(){
		return new Promise(function (resolve) {
			const state = Taro.$store.getState();
			//如果有授权信息
			if( Auth.checkAuth() && !state.app.appOnLaunch ){
				//直接返回
				resolve(true);
			}else{
				//判断session_key是否过期
				Taro.checkSession().then(async ()=>{
					//未过期检查token是否有效
					if( !Auth.checkAuth() ){
						//判断是否 token 请求成功
						let flag = await getAuthToken();
						if( flag ) {
							//更新app状态
							Taro.$store.dispatch(changeAppOnLaunch());
							resolve(true);
						}else{
							//提示
							Taro.showToast({
								title : '获取授权信息失败' ,
								icon : 'none' ,
								mask : true
							})
						}
					}else{
						//更新app状态
						Taro.$store.dispatch(changeAppOnLaunch());
						//token 没有过期，直接返回
						resolve(true);
					}
				}).catch(async (err)=> {
					console.log(err);
					let flag = await getAuthToken();
					//判断是否 token 请求成功
					if( flag ) {
						//更新app状态
						Taro.$store.dispatch(changeAppOnLaunch());
						resolve(true);
					}else{
						//提示
						Taro.showToast({
							title : '获取授权信息失败' ,
							icon : 'none' ,
							mask : true
						})
					}
				})
			}
		})
	}

	// 检查令牌是否有效 true--> 有效  false--> 无效
	static checkAuth(){
		const state = Taro.$store.getState();
		//从缓存读取授权信息
		let authorize = state.authorize || Taro.getStorageSync('authorize') || {},
			expiryTime = 0,
			nowTime = ~~(Date.now() / 1000);

		if (authorize.exp) {
			expiryTime = authorize.exp;
		}

		return expiryTime - nowTime > 300;
	}

	//获取token
	static getToken(){
		const state = Taro.$store.getState();
		let authorize = state.authorize || Taro.getStorageSync('authorize');
		return authorize.token;
	}
}

//授权用户 token
async function getAuthToken(){
	const state = Taro.$store.getState();
	//login
	let res = await Taro.login();
	//获取token
	let response = await Taro.request({
		url : `${baseUrl}mall/token` ,
		data : {
			code : res.code
		} ,
        method : 'POST',
        header: {
        'content-type': contentType,
        'appid': appid,
        'Accept': Accept,
        },
    })
    console.log(response);
    
	//判断是否成功
	if(response.data.data){
		//写入token
		let authorize = response.data.data;
		saveAuthToken(authorize);
		return true;
	}else{
		console.log('获取token失败');
		return false;
	}
}

//写入信息
function saveAuthToken (authorize) {
	//写入状态管理
	Taro.$store.dispatch(setTokens(authorize));
	//写入缓存
	Taro.setStorageSync('tokens',authorize)
}