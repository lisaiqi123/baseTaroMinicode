import Taro from '@tarojs/taro'
import { setSite,setPrimary } from '../module/actions/user'

// 默认选择站点
export function getDefaultsCity() {
    let siteData = {
        id: 110100,
        name: "北京站"
    };
    try {
        var value = Taro.getStorageSync('key')
        if (value) {
            siteData = value;
        }
    } catch (e) {
    // Do something when catch error
    }
    console.log(siteData);
    
    Taro.$store.dispatch(setSite(siteData));
    Taro.setStorageSync('siteData',siteData)
}
// 当前定位
export function  getLatLon() {
  let primary;
  Taro.getLocation({
    type: "wgs84",
    success: res => {
      primary = {
        latitude: res.latitude,
        longitude: res.longitude
      };
      Taro.setStorageSync("primary", primary);
      Taro.$store.dispatch(setPrimary(primary));
    },
    fail: () => {
      primary = {
        latitude: "",
        longitude: ""
      };
      Taro.setStorageSync("primary", primary);
      Taro.$store.dispatch(setPrimary(primary));
    }
  });
}
export function showPopup(title){
  Taro.showToast({
    title: title,
    icon: 'success',
    duration: 2000
  })
  .then(res => console.log(res))
}