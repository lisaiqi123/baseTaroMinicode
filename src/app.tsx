import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import configStore from './module/store'
import Index from './pages/index'

import './assets/style/index.scss'
import './assets/fonts/iconfont.css'
import { getDefaultsCity,getLatLon } from './utils/app'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
  require('nerv-devtools')
}

const store = configStore()

class App extends Component<any,any> {
  componentDidMount () {
    Taro.$store = store;
    getDefaultsCity()
    getLatLon()
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/brand/brandIndex/index',
      'pages/original/originalList/index',
      'pages/user/userIndex/index',
      'pages/openPackage/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序位置接口的效果展示'
      }
    },
    tabBar: {
      "color": "#666666",
      "selectedColor": "#F36E20",
      "backgroundColor": "#ffffff",
      "list": [{
              "pagePath": "pages/index/index",
              "iconPath": "./assets/images/user/bar1.png",
              "selectedIconPath": "./assets/images/user/bar01.png",
              "text": "首页"
          },
          {
              "pagePath": "pages/brand/brandIndex/index",
              "iconPath": "./assets/images/user/bar2.png",
              "selectedIconPath": "./assets/images/user/bar02.png",
              "text": "品牌"
          },
          {
              "pagePath": "pages/original/originalList/index",
              "iconPath": "./assets/images/user/bar3.png",
              "selectedIconPath": "./assets/images/user/bar03.png",
              "text": "原创"
          },
          {
              "pagePath": "pages/user/userIndex/index",
              "iconPath": "./assets/images/user/bar4.png",
              "selectedIconPath": "./assets/images/user/bar04.png",
              "text": "我的"
          }
      ]
  },
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider> 
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
