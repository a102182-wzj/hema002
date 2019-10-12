import Taro from '@tarojs/taro'
import * as $global from '../globalSetting/global'
export function  checkToken(){
    if(!Taro.getStorageSync('doctor-online-token')){
        $global.setGlobalData('isloggin',true)
        console.log( $global.getGlobalData('loginStatus'))
    }
} 
