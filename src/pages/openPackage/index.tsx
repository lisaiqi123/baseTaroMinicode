import Taro, { Component } from '@tarojs/taro'
import { View, Text,} from '@tarojs/components'
import './index.scss'
import { showPopup } from '../../utils/app'

export class Index extends Component<any,any> {
  config = {
    navigationBarLoadingtimeText: '拆红包'
  }

  constructor (props) {
    super (props)
    this.state = {
      clickCount: 0,
      Loadingtime: '',
      allTime: 10,
      amount: 25,
      Timer:null,
      is_start:false
    }
  }

  componentWillMount () { }

  componentDidMount () {
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  
  countClick() {
    let that = this;
    let countClick = this.state.clickCount;
    let allTime = this.state.allTime;
    
    if(countClick <= allTime && that.state.Loadingtime===0){
      showPopup('失败')
      this.setState({
        is_start: false
      })
      this.setState({
        Timer: null
      })
      this.setState({
        clickCount: 0
      })
      this.setState({
        Loadingtime: ''
      })
      return false;
    }
    if(countClick>=this.state.amount){
      showPopup('成功')
      clearInterval(that.state.Timer)
      this.setState({
        Timer: null
      })
      return false;
    }
    if(this.state.is_start){
      Taro.vibrateShort({});
      countClick++;
      this.setState({
        clickCount: countClick
      })
    }
    if(!this.state.is_start){
      that.setState({
        is_start: true
      })
      let Loadingtime = this.state.allTime;
      that.setState({Loadingtime:Loadingtime})

      this.setState({
        Timer : setInterval(function(){			// 执行计时器
          that.setState({Loadingtime:Loadingtime--})
          if(Loadingtime == 0){
            console.log('倒计时结束')
            clearInterval(that.state.Timer)
            that.setState({
              is_start: false
            })
            that.setState({
              Timer: null
            })
            that.setState({
              clickCount: 0
            })
            that.setState({
              Loadingtime: ''
            })
          }
        },1000)
      })
    }
    
  }

  render () {
    const is_start = this.state.is_start
    return (
      <View>
        <View>{this.state.allTime}秒之内触发{this.state.amount}次，必得5元现金！</View>
        <View>{this.state.clickCount}</View>
        {!is_start && <View className='circle' onClick={this.countClick}>点击触发</View>}
        {is_start && <View className='circle' onClick={this.countClick}>{this.state.Loadingtime}</View>}
      </View>
    )
  }
}

