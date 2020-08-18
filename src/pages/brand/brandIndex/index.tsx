import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import Card from "./card";
import { showPopup } from '../../../utils/app';
const card = new Card();
export default class Index extends Component<any,any,AnimationPlayState> {
  config: Config = {
    navigationBarTitleText: '品牌',
    usingComponents: {
      'painter': '../../../assets/painter/painter' // 书写第三方组件的相对路径
    }
  }

  constructor(props){
    super(props)
    this.state={
      customStyle :"",
      aa:{
        type: "activity5",
        bg: "https://api.cw100.cn/minipro/mall/partner/image/activity5.png",
        smallBg: "https://api.cw100.cn/minipro/mall/partner/image/small_activity5.png",
        avatar_img: "https://wx.qlogo.cn/mmopen/vi_32/dGQCPsl7EWzTRqBwqmdjThUpKJWJlSD9S0AYsd9gmRQCak1gxcvJaTL4rbicUJqJK6cAPpdzMtf8ib9PwgDAiclKQ/132",
        banner: "https://api.cw100.cn//storage/tenant/11/2020/04/03/1585905612_5e86ffccde877.png",
        brand_img: "https://api.cw100.cn//storage/admin/1/2019/05/17/1558076718_5cde5d2e728e4.png",
        brand_name: "德恩特",
        category: "燃气灶",
        city: "北京市",
        mini_code: "https://api.cw100.cn//storage/mini_/2020/04/24/db911986083ad99d6a3a0f130f2f8c1asid=31&pid=22&acty=91&cid=110100&gid=220&aid=1001.jpg",
        nickname: "李赛奇",
        store_img: "https://api.cw100.cn//storage/tenant/11/2019/03/21/1553132173_5c92ea8d4de47.png",
      },
      shareImg:'',
      authorization:false,
    }
  }
  componentWillMount () { }

  componentDidMount () {
    Taro.showLoading({
      title: 'loading'
    });
    this.setState({
      template:card.do(this.state.aa)
    })
   }

  componentWillUnmount () { }

  componentDidShow () { 
    var _that = this;
    // Taro.getSetting({
    //   success(res) {
    //     if ("scope.writePhotosAlbum" in res.authSetting) {
    //       if (res.authSetting["scope.writePhotosAlbum"] === true) {
    //         _that.state.authorization = false;
    //       } else {
    //         _that.state.authorization = true;
    //       }
    //     } else {
    //       _that.state.authorization = false;
    //     }
    //   }
    // });
  }

  componentDidHide () { }

  onImgOk (e) {
    Taro.hideLoading();
    this.setState({
      shareImg:e.detail.path
    })
  }
  saveToCarame () {
    let _this = this;
    Taro.showLoading({
      title: "图片保存中..."
    });
    Taro.getSetting({
      success(res) {
        if (res.authSetting["scope.writePhotosAlbum"] == true) {
          // _this.state.authorization = false;
          Taro.saveImageToPhotosAlbum({
            filePath: _this.state.shareImg,
            success: function() {
              Taro.hideLoading();
              showPopup("已保存图片到手机");
            },
            complete:function(){
              Taro.hideLoading();
            }
          });
        }
        if (!res.authSetting["scope.writePhotosAlbum"]) {
          Taro.authorize({
            scope: "scope.writePhotosAlbum",
            success() {
              // _this.state.authorization = false;
              Taro.saveImageToPhotosAlbum({
                filePath: _this.state.shareImg,
                success: function() {
                  Taro.hideLoading();
                  showPopup("已保存图片到手机");
                },
                complete:function(){
                  Taro.hideLoading();
                }
              });
            },
            fail(errMsg) {
              // _this.state.authorization = true;
              showPopup("请点击授权按钮");
            }
          });
        }
      }
    });
  }

  render () {
    return (
      <View className='index'>
        <painter className="fl-row-center" onimgOK={this.onImgOk} customStyle={this.state.customStyle} palette={this.state.template} dirty={true}/>
        <Button onClick={this.saveToCarame}>下载</Button>
      </View>
    )
  }
}
