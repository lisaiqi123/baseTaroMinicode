import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component<any,any> {
  render () {
    return (
      <View>
        {
          this.props.hotAreaData.map((item,index)=>{
            return <View className='index' key={index}>
              <View className="lists">
                <Image src={item.logo} className="logoImg"/>
                <View className="infos">
                <View className="fl-row-justy">
                  <View className="title G-one-cloum">{item.name}</View>
                </View>
                <View className="activity">共有<View className='color'>{item.amount==''?0:item.amount}</View>项优惠活动进行中</View>
                <View className="logos">
                  {
                    item.brands.length!=0 
                    ?item.brands.map((item,index)=>{
                      return (
                        <Image className="logosImg" src={item} key={index}/>
                      )
                    })
                    :null
                  }
                </View>
                <View className="km">{item.distance}km</View>
              </View>
            </View>
          </View>
          })
        }
      </View>
      
    )
  }
}

