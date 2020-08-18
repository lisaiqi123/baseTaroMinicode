import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { addTodos, delTodos } from '../../module/actions/todos'
import { getBanner ,getHotArea} from '../../http/api'
import HotAreaList from '../../components/HotAreaList'
import './index.scss'
import pageInit from '../../utils/pageInit'
// @pageInit()

export class Index extends Component<any,any> {
  config = {
    navigationBarTitleText: '首页'
  }

  constructor (props) {
    super (props)
    this.state = {
      newTodo: '',
      bannerData:[],
      hotAreaData:[]
    }
  }

  componentWillMount () { }

  componentDidMount () {
    let { site } = this.props.user
    let site_id = site.id
    this.getBannerData(site_id)
    this.getHotAreaData()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  
  getBannerData(site_id){
    let that = this;
    getBanner(site_id).then((res)=>{
      console.log(res);
      that.setState({
        bannerData:res.data
      })
    })
  }
  getHotAreaData(){
    let that = this;
    let params ={
      lat:
        Taro.getStorageSync("primary").latitude ||
        this.props.user.primary.latitude ||
        "",
      lng:
        Taro.getStorageSync("primary").longitude ||
        this.props.user.primary.longitude ||
        "",
      page: "",
      site_id: this.props.user.site.id
    }
    getHotArea(params).then((res)=>{
      console.log(res);
      that.setState({
        hotAreaData:res.data.items
      })
    })
  }
  render () {
    //图片滚动设置
    const bannerView = this.state.bannerData.map((item,index) => {
      return (
        <SwiperItem className="swiper-item"  key={index}>
          <Image src={item.img} />
        </SwiperItem>
      )
    })
    return (
      <View>
        <View className="navbar">
          <View className="position">
            <View className="iconfont iconweizhi"></View>
            <Text className="text">{this.props.user.site.name}</Text>
            <View className="iconfont iconxiala"></View>
          </View>
          <View className="search fl-row-center">
            <View className="iconfont iconsousuo1"></View>
          </View>
        </View>
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
          autoplay>
            {bannerView}
        </Swiper>
        {/* <!-- 热门优惠商圈 --> */}
        <View className="hot-goods G-bg-white" v-if="hotGoods.length !=0">
          <View className="title fl-row-justy">
              <View className="text G-fx-c">热门优惠商圈
                <View className="tips">成交价基础上再获豪礼</View>
              </View>
              <View className="union-footer G-fx-c">查看全部
                <View className="iconfont iconjinruxiao"></View>
              </View>
          </View>
          <View className="main">
            <HotAreaList hotAreaData={this.state.hotAreaData}></HotAreaList>
          </View> 
        </View>
      </View>
    )
  }
}


export default connect (
  (state) => ({
    todos: state.todos.todos,
    user: state.user
  }), 
  (dispatch) => ({
    addTodos (data:any) {
      dispatch(addTodos(data))
    },
    delTodos (id:any) {
      dispatch(delTodos(id))
    }
  })
)(Index)