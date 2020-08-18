import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, OpenData } from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'
import { getUserDashboard, getUserWallet } from '../../../http/api'
import { configData} from '../../../http/http'

import pageInit from '../../../utils/pageInit'
@pageInit()

export class Index extends Component<any,any> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '我的'
  }

  constructor (props) {
    super (props)
    this.state = {
      dashboard:{
        order:[
          {
          name:'线上订单',
          number:'--',
          status:0,
        },
        {
          name:'店员上传',
          number:'--',
          status:0,
        },
        {
          name:'设计订单',
          number:'--',
          status:0,
        },
        ]
      },
      partnerData: {
        balance: '--',
        total_price: '--',
        shares: '--',
        views: '--'
      },
      hackerPath:configData.hostImg+'minipro/mall/hacker/hackerPath.png',
      partnerPath:configData.hostImg+'minipro/mall/user/partnerPath.png'
    }
  }
  componentWillMount () {
    this.getOrderData()
    this.getUserWalletData()
  }

  componentDidMount () {
  }
  getOrderData() {
    let that = this;
    let params ={
      unionid: this.props.user.tokens.unionid,
      user_id:this.props.user.tokens.user_id
    }
    getUserDashboard(params).then((res)=>{
      if(res.status){
        that.setState({
          dashboard:res.data.order
        })
      }
    })
  }
  getUserWalletData(){
    let that = this;
    let params = {
      unionid:this.props.user.tokens.unionid,
    };
    getUserWallet(params).then(res => {
      if(res.status){
        that.setState({
          partnerData:res.data
        })
      }
    });
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  setRouter(){
    Taro.navigateTo({
      url: '/pages/openPackage/index'
    })
  }

  render () {
    const { user } = this.props
    const hasUserInfo = user.tokens.user_id;
    const hasWxInfo = user.tokens.unionid;
    
    return (
      <View className="content">
        {/* <!-- 个人信息 --> */}
        <View className="users">
          <View className="shezhi fl-row-center"><View className="iconfont iconshezhi1"></View></View>
          <View className="xiaoxi fl-row-center"><View className="iconfont iconxiaoxi"></View></View>
          {!hasWxInfo?<View className="box fl-row-leftNowrap">
            <Image className="userImg" src={user.tokens.headimgurl} />
            <View className="names">
              <View className="userInfo">授权您的微信昵称和头像</View>
            </View>
          </View>:null}
          {hasWxInfo?<View className="box fl-row-leftNowrap">
            <View className="userImg">
              <OpenData className="avatar" type="userAvatarUrl"/>
            </View>
            <View>
              <View className="names">
                <OpenData type="userNickName" className="nickName"/>
              </View>
              {!hasUserInfo?<View className="tel">手机号授权</View>:null}
              {hasUserInfo?<View  className="identity">{user.tokens.mobile}</View>:null}
            </View>
          </View>:null}
        </View>
        {/* <!-- 订单 --> */}
        <View className="order-box fl-row-around">
          {
            this.state.dashboard.map((item,index)=>{
              return  <View className="fl-column-center" key={index}>
                <View className="title">{item.number}{item.status!='0'?<View className="tips"></View>:null}</View>
                <View className="fl-row-center p">{item.name}</View>
                <View className="line" v-if="index!=2"></View>
              </View>
            })
          }
        </View>
        {/* <!-- 黑客入口 --> */}
        <View className="hacker-box fl-row-center" v-if="partner.isHacker==1">
          <Image src={this.state.hackerPath} onClick={this.setRouter}/>
        </View>
        {/* <!-- 合伙人入口 --> */}
        <View className="partner-box fl-row-center " v-if="partner.isPartner==1">
          <Image src={this.state.partnerPath} />
        </View>
        {/* <!-- 钱包 --> */}
        <View className="package">
          <View className="inner">
            <View className="boarder">可获取收益</View>
            <View className="money-box">
              <View className="money fl-row-justy">
                <View className="span">￥{this.state.partnerData.balance}</View>
                <View className="p">
                  获取到微信钱包
                </View>
              </View>
            </View>
            <View className="pa-box fl-row-around">
              <View
                className="fl-column-center">
                <View className="fl-row-center p">
                  {this.state.partnerData.total_price==0?'0':this.state.partnerData.total_price}
                </View>
                <View className="title">累计收益/元</View>
              </View>
              <View
                className="fl-column-center">
                <View className="fl-row-center p">
                  {this.state.partnerData.shares==0?'0':this.state.partnerData.shares}
                </View>
                <View className="title">分享次数/次</View>
              </View>
              <View
                className="fl-column-center">
                <View className="fl-row-center p">
                  {this.state.partnerData.views==0?'0':this.state.partnerData.views}
                </View>
                <View className="title">打开次数/次</View>
              </View>
            </View>
          </View>
        </View>
        {/* <!-- 其他 --> */}
        <View className="single-box">
          <View className="more fl-row-left">
            <View className="fl-column-center box">
              <View className="fl-column-center"><View className="iconfont iconfanxian color1"></View></View>
              <View className="fl-row-center p">返现</View>
            </View>
            <View className="fl-column-center box">
              <View className="fl-column-center"><View className="iconfont iconyouhui color2"></View></View>
              <View className="fl-row-center p">优惠</View>
            </View>
            <View className="fl-column-center box">
              <View className="fl-column-center"><View className="iconfont iconhuodong1 color3"></View></View>
              <View className="fl-row-center p">活动</View>
            </View>
            <View className="fl-column-center box">
              <View className="fl-column-center"><View className="iconfont iconyouhuiquan color4"></View></View>
              <View className="fl-row-center p">优惠券</View>
            </View>
            <View className="fl-column-center box">
              <View className="fl-column-center"><View className="iconfont iconyuyue color5"></View></View>
              <View className="fl-row-center p">预约</View>
            </View>
            <View className="fl-column-center box">
              <View className="fl-column-center"><View className="iconfont iconrizhi color6"></View></View>
              <View className="fl-row-center p">日志</View>
            </View>
            <View className="fl-column-center box">
              <View className="fl-column-center"><View className="iconfont iconfangwu color7"></View></View>
              <View className="fl-row-center p">房屋</View>
            </View>
            <View className="fl-column-center box">
              <View className="fl-column-center"><View className="iconfont iconlipin1 color8"></View></View>
              <View className="fl-row-center p">礼品</View>
            </View>
            <View className="fl-column-center box">
              <View className="fl-column-center"><View className="iconfont iconhuiyuan color9"></View></View>
              <View className="fl-row-center p">会员</View>
            </View>
            <View className="fl-column-center box">
              <View className="fl-column-center"><View className="iconfont iconshoucang color10"></View></View>
              <View className="fl-row-center p">收藏</View>
            </View>
            <View className="fl-column-center box">
              <View className="fl-column-center"><View className="iconfont iconshouhou color11"></View></View>
              <View className="fl-row-center p">售后</View>
            </View>
          </View>
        </View>
        {/* // <!-- 授权 --> */}
        {/* <Authorize v-if="!(hasWxInfo && hasUserInfo)" @cb_user='cb_user'></Authorize> */}
      </View>
    )
  }
}
export default connect (
  (state) => ({
    user: state.user
  }), 
  (dispatch) => ({
  })
)(Index)
