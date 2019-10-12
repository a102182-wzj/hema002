import Taro from '@tarojs/taro'
import { View, Button, Icon } from '@tarojs/components'
import request, { set_token } from '../../utils/request'
import * as $global from './../../globalSetting/global'
import './index.less'

export default class LoginAuthor extends Taro.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLogin: $global.getGlobalData('isloggin')
        }
    }

    wechatLogin(who) {
        Taro.login({
            success: res => {
                console.log(res)
                Taro.getUserInfo({
                    withCredentials: true,
                    success: user_info => {
                        Taro.setStorageSync('user',user_info)
                        console.log(Taro.getStorageSync('user'))
                        let userInfo = user_info.userInfo
                        let encrypted_data = user_info.encryptedData
                        // let user = {
                        //     name: userInfo.nickName,
                        //     userAvatarUrl: userInfo.avatarUrl
                        // }
                        // wx.setStorageSync('user', user)
                        let iv = user_info.iv
                        request.post("login/" + who, {
                            code: res.code,
                            name: 'doctor',
                            encrypted_data: encrypted_data,
                            iv: iv
                        }).then(login_res => {
                            console.log('login',login_res)
                            set_token(login_res.key)
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                })
            }
        })

    }


    CloseLogin = () => {
        this.setState({
            showLogin: false
        })
    }


    render() {
        return (
            <View>
                {this.state.showLogin ?
                    <View className='login'>
                        <View className='login-box'>
                            <View className='Icons'>
                                <Icon type='cancel' onClick={() => this.CloseLogin()} />
                            </View>
                            <Button onGetUserInfo={() => {
                                if (process.env.TARO_ENV === 'weapp') {
                                    this.wechatLogin("weapp")
                                } else if (process.env.TARO_ENV === 'tt') {
                                    this.wechatLogin("bytedance")
                                }
                                this.CloseLogin()
                                $global.setGlobalData('isloggin', false)
                            }} open-type='getUserInfo'>授权登录</Button>
                        </View>
                    </View>
                    : null}
            </View>

        )
    }
}


